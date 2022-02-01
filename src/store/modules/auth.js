import authApi from '@/api/auth.js';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
    isSibmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
};

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',
};

export const actionTypes = {
    register: '[auth] register',
    login: '[login] login',
};

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous',
};

export const getters = {
    [getterTypes.currentUser]: (state) => {
        return state.currentUser;
    },
    [getterTypes.isLoggedIn]: (state) => {
        return Boolean(state.isLoggedIn); // приведение к булевому значению
    },
    [getterTypes.isAnonymous]: (state) => {
        return state.isAnonymous === false; //getter не сработает, когда у нас null
    },
};

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
    [mutationTypes.loginStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
};

const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.registerStart);
            authApi
                .register(credentials)
                .then((response) => {
                    context.commit(
                        mutationTypes.registerSuccess,
                        response.data.user
                    );
                    setItem('accessToken', response.data.user.token); //key и data из persistanceStorage
                    resolve(response.data.user);
                })
                .catch((result) => {
                    context.commit(
                        mutationTypes.registerFailure,
                        result.response.data.errors
                    );
                });
        });
    },
    [actionTypes.login](context, credentials) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.loginStart);
            authApi
                .login(credentials)
                .then((response) => {
                    context.commit(
                        mutationTypes.loginSuccess,
                        response.data.user
                    );
                    setItem('accessToken', response.data.user.token); //key и data из persistanceStorage
                    resolve(response.data.user);
                })
                .catch((result) => {
                    context.commit(
                        mutationTypes.loginFailure,
                        result.response.data.errors
                    );
                });
        });
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
};
