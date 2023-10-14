<template>
    <div>
        <div class="ui threaded comments">
            <h3 class="ui dividing header">
                <div v-if="isCollapsed" class="sixteen wide computer column sixteen wide mobile column">
                    {{ comments.length }} Comments
                    <i class="ui chevron down icon" title="expand"></i>
                </div>
                <div v-else class="sixteen wide computer column sixteen wide mobile column">
                    {{ comments.length }} Comments
                    <i class="ui chevron up icon" title="collapse"></i>
                </div>
                <br />
            </h3>
            <div v-if="comments.length > 0">
                <div v-for="comment in comments" :key="comment.id" class="comment">
                    <a class="avatar">
                        <img :src="comment.author.avatar" />
                    </a>
                    <div class="content">
                        <NuxtLink :to="`/contributors/${comment.author.name_slug}`">
                            {{ comment.author.name }}
                            <div v-if="author_id === comment.user_id" class="ui tiny link label">
                                OWNER
                            </div>
                        </NuxtLink>
                        <div class="metadata">
                            <span class="date">
                                {{ comment.created_at }}
                            </span>
                        </div>
                        <span v-if="canDelete(comment.author.name_slug)" style="float: right !important; cursor: pointer">
                            <i class="ui small trash icon"></i>
                        </span>
                        <div class="text">
                            <div style="width: 95% !important">
                                {{ comment.comment }}
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div class="ui horizontal divider"></div>
            <form class="ui reply form">
                <div class="field">
                    <textarea></textarea>
                </div>
                <div v-if="_isLoggedIn" class="ui tbb submit button">Post Comment</div>
                <div v-else>
                    <small>
                        <a href="/#/signin"> Signin </a>
                        to post comment.
                    </small>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    props: {
        comments: Array<any>,
        author_id: Number,
    },
    computed: {
        _isLoggedIn() {
            const hasSession = this.$store.state.access_token !== null
            this.isLoggedIn = hasSession
            return this.isLoggedIn
        },
    },
    data() {
        return {
            isCollapsed: true,
            isLoggedIn: false,
        }
    },
    methods: {
        canDelete(commentAuthorSlug) {
            return this.isLoggedIn && this.$store.state.username === commentAuthorSlug
        },
    },
})
</script>

<style scoped>
.chevron {
    cursor: pointer !important;
}

.hidden {
    display: none !important;
}
</style>
