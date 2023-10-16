<template>
    <div>
        <div class="ui grid">
            <div class="fourteen wide computer column mobile hidden">
                <div class="ui secondary menu">
                    <NuxtLink to="/usage-policy" class="item" title="Cookbooks HQ Usage Policy. Property of cookbookshq.com">
                        Usage Policy
                    </NuxtLink>
                    <NuxtLink to="/terms-and-conditions" class="item" title="CookbooksHQ Terms And Conditions. Property of cookbookshq.com">
                        Terms &amp; Conditions
                    </NuxtLink>
                    <NuxtLink to="/data-retention-policy" class="item" title="CookbooksHQ Data Retention Policy. Property of cookbookshq.com">
                        Data Retention Policy
                    </NuxtLink>
                    <NuxtLink to="/privacy-policy" class="item" title="CookbooksHQ Privacy Policy. Property of cookbookshq.com">
                        Privacy Policy
                    </NuxtLink>
                    <NuxtLink to="/developers" class="item" title="API and Documentation for developers">
                        API <sup class="ui mini label beta">Beta</sup>
                    </NuxtLink>
                </div>
            </div>
            <div class="two wide computer column sixteen wide mobile column secondary menu">
                <div class="ui secondary menu flex-container">
                    <a class="item"
                        title="Get fresh updates about new submissions, events and more by following our facebook page. Property of cookbookshq.com">
                        <i class="facebook f icon"></i>
                    </a>
                    <a class="item"
                        title="Get latest updates from our global recipes base in real time by following our Twitter handle. Property of cookbookshq.com">
                        <i class="twitter t icon"></i>
                    </a>
                    <a class="item"
                        title="Get latest updates from our global recipes base in real time by following our Instagram handle. Property of cookbookshq.com">
                        <i class="instagram icon"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.beta {
    background: grey !important;
}
</style>
