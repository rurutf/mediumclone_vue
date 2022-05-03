<template>
    <div>
        <div v-if="isLoading">Loading...</div>
        <div v-if="error">Something bad happened</div>
        <div v-if="feed">
            <div
                class="article-preview"
                v-for="(article, index) in feed.article"
                :key="index">
                <div class="article-meta">
                    <router-link :to="{ name: 'userProfile', params: {slug: article.author.username}}">
                        <img :src="article.author.image" alt="avatar" />
                    </router-link>
                    <div class="info">
                        <router-link
                            :to="{ name: 'userProfile', params: {slug: article.author.username}}"
                            class="author">
                        </router-link>
                        <span class="date">{{ article.created }}</span>
                    </div>
                    <div class="pull-xs-right">
                        ADD TO FAVORITES
                    </div>
                </div>
                <router-link
                    :to="{name: 'article', params: {slug: article.slug}}"
                    class="preview-link">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description}}</p>
                    <span>Read more...</span>
                    TAG LIST
                </router-link>
            </div>
            <McvPagination
                :total="total"
                :limit="limit"
                :current-page="currentPage"
                :url="url"/>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "@/store/modules/feed.js";
import McvPagination from "@/components/Pagination.vue";

export default {
    name: "McvFeed",
    data() {
        return {
            total: 500,
            limit: 10,
            currentPage: 5,
            url: '/',
        }
    },
    components: {
        McvPagination,
    },
    props: {
        apiUrl: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
    },
}
</script>
