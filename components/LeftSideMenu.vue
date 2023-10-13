<template>
    <div style="background-color:#F9f9f9;border-radius: 8px; width: 100%; height: auto;padding:12px;">
        <div class="ui list">
            <div class="item">
                <div class="content">
                    <NuxtLink to="/search">
                        <div>
                            <small><i class="ui search icon"></i>Advanced Search</small>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <br />
            <div class="item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Recipes' } }">
                        <div>
                            <small>
                                <u>
                                    My Recipes {{ my_recipes ? my_recipes.length : 0 }}
                                </u>
                            </small>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div class="item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Drafts' } }">
                        <div>
                            <small>
                                <u>
                                    My Drafts {{ my_drafts ? my_drafts.length : 0 }}
                                </u>
                            </small>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div class="item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Preferences' } }">
                        <div>
                            <small>
                                <u>
                                    My Preferences
                                </u>
                            </small>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <br />
            <div class="item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Profile' } }">
                        <div>
                            <small>
                                <i class="ui picture icon"></i> My Profile
                            </small>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div class="ui disabled item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Notifications' } }">
                        <small><i class="ui bell icon"></i>My Notifications 0</small>
                    </NuxtLink>
                </div>
            </div>
            <div class="disabled item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Privacy Settings' } }">
                        <small>
                            <i class="ui lock icon"></i> Privacy Settings
                        </small>
                    </NuxtLink>
                </div>
            </div>
            <div class="disabled item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Display Settings' } }">
                        <small>
                            <i class="ui puzzle icon"></i> Display Settings
                        </small>
                    </NuxtLink>
                </div>
            </div>
            <div class="disabled item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Redeem Points' } }">
                        <small>
                            <i class="ui trophy icon"></i> Redeem Points
                        </small>
                    </NuxtLink>
                </div>
            </div>
            <div class="disabled item">
                <div class="content">
                    <NuxtLink :to="{ path: '/dashboard', query: { tab: 'Payments & Billing' } }">
                        <small>
                            <i class="ui dollar sign icon"> </i>Payments & Billing
                        </small>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <br />
        <div>
            <div class="ui circular teal disabled button">
                <a href="/#/contact-sales" style="color:white!important;">Advertise With Us</a>
            </div>
            <br /><br />
            <div class="ui tbb circular disabled button">
                <a href="/#/plans" style="color:white!important;">Upgrade Your Plan</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LeftSideMenu",
    computed: {
        my_recipes() {
            const recipes = this.$store.state.contributor?.recipes || []
            return recipes.filter(function (recipe) {
                return recipe.is_draft === false
            })
        },
        my_drafts() {
            const recipes = this.$store.state.contributor?.recipes || []
            return recipes.filter(function (recipe) {
                return recipe.is_draft === true
            })
        }
    },
};
</script>