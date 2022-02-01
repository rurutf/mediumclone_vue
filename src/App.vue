<template>
    <div id="nav">
        <MvcTopbar />
        <router-view />
    </div>
</template>

<script>
import MvcTopbar from "@/components/Topbar";

export default {
    name: 'MvcApp',
    components: {
        MvcTopbar,
    },
};
</script>
