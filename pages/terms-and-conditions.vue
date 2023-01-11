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

<script>
export default {
  computed: {
    policy() {
      return this.$store.getters.get_terms_and_conditions()
    },
  },
}
</script>
