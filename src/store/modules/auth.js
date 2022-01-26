const state = {
    isSibmitting: false,
};

const mutations = {
    registerStart(state) {
        state.isSubmitting = true;
    },
};
export default {
    state,
    mutations,
};
