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
  data() {
    return {
        policy: this.$store.state.policies.usagePolicy
    }
  },
})
</script>
