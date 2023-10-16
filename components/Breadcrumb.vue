<template>
    <div class="ui grid">
        <div class="sixteen wide computer column">
            <div class="ui header title">
                <div class="ui small breadcrumb">
                    <a class="section" href="/">back home</a>
                    <i class="left chevron icon divider"></i>
                    <div v-if="activeLink === 'My Dashboard'" class="active section">
                        public profile
                    </div>
                    <div v-else class="active section">
                        <div v-if="isCookbookRoute()">
                            {{ active }}
                        </div>
                        <div v-else>
                            <NuxtLink :to="path">
                                {{ active }}
                            </NuxtLink>
                            <i class="left chevron icon divider"></i> {{ child }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    props: {
        active: String,
        parentSlug: String,
        path: String,
        child: String,
    },
    computed: {
        activeLink() {
            return this.active
        },
        isLoggedIn() {
            return this.$store.state.access_token
        },
    },
    methods: {
        isCookbookRoute() {
            return this.$route.name === 'Cookbook'
        },
    },
})
</script>

<style scoped>
.title {
    text-transform: uppercase;
    font-weight: 300;
}
</style>
