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
                        class="nav-link"
                        active-class="active"
                        exact>
                        Home
                    </router-link>
                </li>
                <template v-if="isLoggetIn">
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'createArticle'}"
                            class="nav-link"
                            active-class="active">
                            <i class="ion-compose"></i> &nbsp; New Article
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'settings'}"
                            class="nav-link"
                            active-class="active">
                            <i class="ion-gear-a"></i> &nbsp; Settings
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'userProfile', params: {slug: currentUser.username}}"
                            class="nav-link">
                            <img
                                class="user-pi"
                                :src="currentUser.image" />
                            &nbsp;
                            {{currentUser.username}}
                        </router-link>
                    </li>
                </template>
                <template v-if="isAnonymous">
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'login'}"
                            class="nav-link"
                            active-class="active">
                            Sign in
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'register'}"
                            class="nav-link"
                            active-class="active">
                            Sign up
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
import {mapGetters} from "vuex" ;
import {getterTypes} from "@/store/modules/auth";

export default {
    name: "MvcTopbar",
    computed: {
        ...mapGetters({
            currentUser: getterTypes.currentUser,
            isLoggedIn: getterTypes.isLoggedIn,
            isAnonymous: getterTypes.isAnonymous,
        }),
    },
}
</script>
