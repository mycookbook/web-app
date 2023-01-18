<template>
  <div>
    <div class="ui grid">
      <div class="fourteen wide computer column mobile hidden">
        <div class="ui secondary menu">
          <NuxtLink to="/usage-policy">
            <a
              class="item"
              title="Cookbooks HQ Usage Policy. Property of cookbookshq.com"
            >
              Usage Policy
            </a>
          </NuxtLink>
          <NuxtLink to="/terms-and-conditions">
            <a
              class="item"
              title="CookbooksHQ Terms And Conditions. Property of cookbookshq.com"
            >
              Terms &amp; Conditions
            </a>
          </NuxtLink>
          <NuxtLink to="/data-retention-policy">
            <a
              class="item"
              title="CookbooksHQ Data Retention Policy. Property of cookbookshq.com"
            >
              Data Retention Policy
            </a>
          </NuxtLink>
          <NuxtLink to="/privacy-policy">
            <a
              class="item"
              title="CookbooksHQ Privacy Policy. Property of cookbookshq.com"
            >
              Privacy Policy
            </a>
          </NuxtLink>
          <NuxtLink to="/developers">
            <a class="item" title="API and Documentation for developers">
              API <sup class="ui mini label beta">Beta</sup>
            </a>
          </NuxtLink>
        </div>
      </div>
      <div
        class="two wide computer column sixteen wide mobile column secondary menu"
      >
        <div class="ui secondary menu flex-container">
          <a
            class="item"
            title="Get fresh updates about new submissions, events and more by following our facebook page. Property of cookbookshq.com"
          >
            <i class="facebook f icon"></i>
          </a>
          <a
            class="item"
            title="Get latest updates from our global recipes base in real time by following our Twitter handle. Property of cookbookshq.com"
          >
            <i class="twitter t icon"></i>
          </a>
          <a
            class="item"
            title="Get latest updates from our global recipes base in real time by following our Instagram handle. Property of cookbookshq.com"
          >
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
