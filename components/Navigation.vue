<template>
    <div>
        <div class="ui top fixed menu grid mobile hidden">
            <div class="six wide tablet column six wide computer column tvn no padding">
                <div class="tvn clipped brand">
                    <a href="/" class="ui massive fluid image" title="cookbookshq brand logo">
                        <img class="logo" src="~/assets/img/transparent_logo.png" alt="cookbookinc brand logo">
                    </a>
                </div>
            </div>
            <div class="ten wide tablet column ten wide computer column">
                <div class="selectors">
                    <div class="ui secondary menu" style="margin-right: 50px;" v-if="routeName != 'search'">
                        <div class="ui search">
                            <div class="ui icon input">
                                <input class="ui circular prompt" type="text" placeholder="Type to search ..."
                                    @keyup="searchForQuery" v-model="globQ">
                                <i class="search icon"></i>
                            </div>
                        </div>
                    </div>
                    <div class="ui secondary menu">
                        <div>
                            <div class="ui button tbb white-text">
                                <NuxtLink :to="{ path: '/stores-locator' }">
                                    <i class="ui point icon"></i>Stores Locator
                                </NuxtLink>
                            </div>
                        </div>
                        <div v-if="isLoggedIn">
                            <div class="ui button tbb tablet hidden" id="dashboard-btn">
                                <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Recipes' } }"
                                    title="Navigate to my dashboard">
                                    My Dashboard
                                </NuxtLink>
                            </div>
                            <div class="ui  button" @click="logOut()">
                                Logout
                            </div>
                        </div>
                        <div v-else>
                            <NuxtLink to="/signin" class="ui button tbb tablet hidden" id="signinBtn">
                                Sign in
                            </NuxtLink>
                            <NuxtLink to="" class="ui button tbb tablet only" id="signinBtn">
                                Sign in
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MobileNav />
    </div>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            if (Object.is(this.$store.state.access_token, null)) {
                return false
            }

            return true
        },
        routeName() {
            return this.$route.name
        }
    },
    data() {
        return {
            globQ: ''
        }
    },
    methods: {
        logOut: function () {
            this.$store.dispatch('logout')
        },
        searchForQuery(e) {
            if (e.which === 13) {
                const router = useRouter()
                router.replace({ name: "search", query: { 'q': this.globQ } })
            }
        }
    }
};
</script>

<style>
.tbb {
    background-color: #0160CC !important;
    color: white !important;
    font-weight: 300 !important;
}

.item {
    font-weight: 300 !important;
    letter-spacing: 0.05em !important;
    font-size: 18px !important;
}

.top.fixed.menu {
    border-bottom: none !important;
    padding-top: 50px !important;
}

body {
    background: transparent !important;
}

.brand-logo {
    margin-top: -4vh !important;
    margin-left: 25px !important;
}

.white-text>a, #dashboard-btn>a{
    color: white !important;
}
</style>