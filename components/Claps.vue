<template>
  <div
    class="ui tbb fluid button"
    title="claps"
    :class="{ disabled: hasReachedMaximumAllowedThreshold }"
    @click="addClap()"
  >
    <span>
      <i class="ui heart icon"></i>
      {{ numberFormatter(totalCount) }} Claps
    </span>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  mounted() {
    this.$store.dispatch('reset_hasClapped')
  },
  computed: {
    totalCount() {
      return this.$store.state.recipe.claps || 0
    },
    hasReachedMaximumAllowedThreshold() {
      return (
        this.$store.state.recipeStore.hasClapped >=
        this.$store.state.recipeStore.maxAllowedClaps
      )
    },
    numberFormatter(value) {
      return value
    },
  },
  methods: {
    addClap() {
      const id = this.$store.state.recipe.id
      const payload = { recipeId: id }
      this.$store.dispatch('addClap', payload)
    },
  },
})
</script>
