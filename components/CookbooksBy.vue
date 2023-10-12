<template>
  <div>
    <Navigation />
    <div class="ui container" style="margin-top: 10%">
      {{ recipe.author.contributions }}
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    recipe() {
      return this.$store.state.recipe
    },
  },
})
</script>
<style scoped>
.example-class {
  color: #000;
}
</style>
