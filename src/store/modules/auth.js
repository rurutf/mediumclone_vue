import authApi from '@/api/auth.js';

const state = {
    isSibmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
};

const mutations = {
    registerStart(state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    registerFailure(state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
};

const actions = {
    register(context, credentials) {
        return new Promise((resolve) => {
            context.commit('registerStart');
            authApi
                .register(credentials)
                .then((responce) => {
                    context.commit('registerSuccess', responce.data.user);
                    resolve(responce.data.user);
                })
                .catch((result) => {
                    context.commit(
                        'registerFailure',
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
};
