<template>
  <div>
    <Navigation />
    <div class="ui container">
      <div class="ui error message">
        <div class="header">Oops! it looks like there was an error</div>
        <br />
        <div>
          {{ _errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    _errorMessage() {
      return this.$route.query.m
    },
  },
})
</script>

<style scoped>
.container {
  margin-top: 23vh;
}
</style>
