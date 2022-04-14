<template>
    <div id="nav">
        <McvTopbar />
        <router-view></router-view>
    </div>
</template>

<script>
import McvTopbar from '@/components/Topbar';
import actionTypes from '@/store/modules/auth';

export default {
    name: 'App',
    components: {
        McvTopbar,
    },
    mounted() {
        this.$store.dispatch(actionTypes.getCurrentUser)
    }
};
</script>
