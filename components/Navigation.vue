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
                    <div class="ui secondary menu">
                        
                        <div>
                            <div class="ui button tbb white-text">
                                <NuxtLink :to="{ path: '/stores-locator' }" title="Navigate to my dashboard">
                                    <i class="ui point icon"></i>Stores Locator
                                </NuxtLink>
                            </div>
                        </div>
                        <div v-if="isLoggedIn">
                            <div class="ui tbb button" @click="logOut()">
                                Logout
                            </div>
                            <div class="ui button tbb tablet hidden" id="dashboard-btn">
                                <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Recipes' } }"
                                    title="Navigate to my dashboard">
                                    My Dashboard
                                </NuxtLink>
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
            return (this.$store.state.access_token);
        },
    },
    methods: {
        logOut: function () {
            this.$store.dispatch('logout')
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

#dashboard-btn>a,
.white-text>a {
    color: white !important;
}
</style>