<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link
                :to="{name: 'home'}"
                class="navbar-brand">
                MediumClone
            </router-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link
                        :to="{name: 'home'}"
                        class="nav-link">
                        Home
                    </router-link>
                </li>
                <template
                    v-if="isLoggetIn">
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'home'}"
                            class="nav-link">
                            <i class="ion-compose"></i> &nbsp; New Article
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
import {mapState} from "vuex" ;

export default {
    name: "MvcTopbar",
    computed: {
        ...mapState ({
            currentUser: state => state.auth.currentUser,
            isLoggetIn: state => state.auth.isLoggetIn,
        }),
    },
}
</script>
