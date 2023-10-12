<template>
  <div class="ui grid">
    <div class="sixteen wide computer column sixteen wide mobile column">
      <div class="ui mini breadcrumb">
        <a class="section">Dashboard</a>
        <i class="right chevron icon divider"></i>
        <div class="active section">
          {{ active }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    active: String,
  },
})
</script>

<style scoped>
.example-class {
  color: #000;
}
</style>
