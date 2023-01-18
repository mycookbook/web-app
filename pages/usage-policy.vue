<template>
  <div>
    <Navigation />
    <div class="ui container" style="margin-top: 18vh">
      <div v-html="policy"></div>
      <ContactForm />
      <BottomNav />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    policy() {
      return this.$store.getters.get_usage_policy()
    },
  },
})
</script>
