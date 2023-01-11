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
      return this.$store.getters.get_data_retention_policy()
    },
  },
})
</script>

<style scoped>
.grid label {
  font-weight: 900 !important;
}
</style>
