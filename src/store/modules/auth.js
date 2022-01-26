import authApi from '@/api/auth.js';

const state = {
    isSibmitting: false,
};

const mutations = {
    registerStart(state) {
        state.isSubmitting = true;
    },
    registerSuccess(state) {
        state.isSubmitting = false;
    },
    registerFailure(state) {
        state.isSubmitting = false;
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
