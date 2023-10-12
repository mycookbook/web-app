<template>
    <div>
        <div class="ui top fixed menu grid mobile only" v-show="isToggleOn">
            <div class="sixteen wide computer column">
                <div class="ui grid">
                    <div class="ui sixteen wide white menu column" style="margin-top:6vh;">
                        <div v-if="isLoggedIn">
                            <a class="ui secondary menu item link" @click="logOut()">
                                Logout
                            </a>
                            <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Recipes' } }"
                                class="ui secondary menu item link">
                                My Recipes
                            </NuxtLink>
                            <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Drafts' } }"
                                class="ui secondary menu item link">
                                My Drafts
                            </NuxtLink>
                            <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Preferences' } }"
                                class="ui secondary menu item link">
                                My Preferences
                            </NuxtLink>
                            <NuxtLink to="/help/query-syntax" class="ui secondary menu item link">
                                Help Docs
                            </NuxtLink>
                        </div>
                        <div v-else>
                            <NuxtLink to="/signin" class="ui secondary menu item link">
                                Login with TikTok
                            </NuxtLink>
                        </div>
                        <div v-if="routeName == 'help-page'">
                            <NuxtLink to="/help/query-syntax" class="ui secondary menu item link">
                                Search Query Syntax
                            </NuxtLink>
                            <NuxtLink to="/help/templates" class="ui secondary menu item link">
                                Templates
                            </NuxtLink>
                            <NuxtLink to="/help/faqs" class="ui secondary menu item link">
                                FAQs
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui top fixed hidden menu mobile only">
            <div class="ui grid container">
                <div class="ui fourteen wide mobile column">
                    <a href="/">
                        <img src="transparent_logo.png" class="ui centered image" alt="cookbookinc brand logo"
                            style="margin-top:-6%!important;margin-left:16%!important;">
                    </a>
                </div>
                <div class="ui two wide mobile column" id="hamburger-icon" @click="toggleMobileMenu()">
                    <i class="large bars icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    name: "MobileNavigation",
    computed: {
        isRegistrationRoute() {
            return (this.$router.currentRoute.name == 'Register')
        },
        isLoggedIn() {
            return (this.$store.state.access_token);
        },
        routeName() {
            return this.$route.name
        }
    },
    data() {
        return {
            isToggleOn: false
        }
    },
    methods: {
        toggleMobileMenu: function () {
            this.isToggleOn = !this.isToggleOn
        },
        logOut: function () {
            this.$store.dispatch('logout')
        }
    }
};
</script>
    
<style scoped>
.link {
    color: #4183C4 !important;
}
</style>