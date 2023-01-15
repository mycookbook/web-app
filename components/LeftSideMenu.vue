<template>
  <div
    style="
      background-color: #f9f9f9;
      border-radius: 8px;
      width: 100%;
      height: auto;
      padding: 12px;
    "
  >
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
      <!-- <div class="disabled item">
        <div class="content">
          <NuxtLink to="/dashboard?tab=Cookbooks">
            <div>
              <small>
                <u>
                  Cookbooks
                  {{
                    _contributor.cookbooks ? _contributor.cookbooks.length : 0
                  }}
                </u>
              </small>
            </div>
          </NuxtLink>
        </div>
      </div> -->
      <div class="item">
        <div class="content">
          <NuxtLink to="/dashboard?tab=Recipes">
            <div>
              <small>
                <u>
                  My Recipes
                  {{ _recipes ? _recipes.length : 0 }}
                </u>
              </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <NuxtLink to="/dashboard?tab=Drafts">
            <div>
              <small>
                <u> Drafts {{ _drafts ? _drafts.length : 0 }} </u>
              </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <br />
      <div class="item">
        <div class="content">
          <NuxtLink to="/search?tab=Preferences">
            <div>
              <small>
                <u> Preferences </u>
              </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <br />
      <div class="item">
        <div class="content">
          <NuxtLink to="/dashboard?tab=Profile">
            <div>
              <small> <i class="ui picture icon"></i> My Profile </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="ui item">
        <div class="content">
          <NuxtLink to="/dashboard?tab=Notifications">
            <div>
              <small><i class="ui bell icon"></i> Notifications 0</small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <NuxtLink :to="`/dashboard?tab=Privacy Settings`">
            <div>
              <small> <i class="ui lock icon"></i> Privacy Settings </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <NuxtLink
            :to="{
              path: '/dashboard',
              query: { tab: 'Display Settings' },
            }"
          >
            <div>
              <small> <i class="ui puzzle icon"></i> Display Settings </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="disabled item">
        <div class="content">
          <NuxtLink
            :to="{
              path: '/dashboard',
              query: { tab: 'Redeem Points' },
            }"
          >
            <div>
              <small> <i class="ui trophy icon"></i> Redeem My Points </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="disabled item">
        <div class="content">
          <NuxtLink
            :to="{
              path: '/dashboard',
              query: { tab: 'Payments & Billing' },
            }"
          >
            <div>
              <small>
                <i class="ui dollar sign icon"></i> Payments & Billing
              </small>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <br />
    <div>
      <div class="ui circular teal button">
        <a href="/#/contact-sales" style="color: white !important"
          >Advertise With Us</a
        >
      </div>
      <br /><br />
      <div class="ui tbb circular button">
        <a href="/#/plans" style="color: white !important">Upgrade Your Plan</a>
      </div>
      <br />
      <small>
        Unlock more powerful features with our Premium Plan. Terms & conditions
        apply.
      </small>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    _recipes() {
      const recipes = this.$store.state.contributor.recipes
      return recipes.filter(function (recipe) {
        return recipe.is_draft === false
      })
    },
    _drafts() {
      const recipes = this.$store.state.contributor.recipes
      const cookbooks = this.$store.state.contributor.cookbooks
      const _recipes = recipes.filter(function (recipe) {
        return recipe.is_draft === true
      })
      const _cookbooks = cookbooks.filter(function (cookbook) {
        return cookbook.is_draft === true
      })

      return _recipes.concat(_cookbooks)
    },
  },
})
</script>
