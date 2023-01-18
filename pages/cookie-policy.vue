<template>
  <div>
    <Navigation />
    <div class="ui container" style="margin-top: 18vh">
      <div class="ui grid">
        <div class="sixteen wide column">
          <div v-html="policy"></div>
        </div>
      </div>
      <ContactForm />
      <BottomNav />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    policy() {
      return this.$store.getters.get_cookie_policy()
    },
  },
})
</script>
