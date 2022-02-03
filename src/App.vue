<template>
    <div id="nav">
        <MvcTopbar />
        <router-view />
    </div>
</template>

<script>
import MvcTopbar from "@/components/Topbar";
import actionTypes from "@/store/modules/auth"

export default {
    name: 'MvcApp',
    components: {
        MvcTopbar,
    },
    mounted() {
        this.$store.dispatch(actionTypes.getCurrentUser)
    }
};
</script>
