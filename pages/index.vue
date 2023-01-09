<template>
  <div>
    <h1>Welcome to the homepage</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('boot')
  },
}
</script>
