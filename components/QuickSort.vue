<template>
  <div>
    <div class="ui massive search">
      <Explorer :filters="filters" />
    </div>
    <div>
      <Results :cookbooks="cookbooks" />
    </div>
    <div>
      <!-- Featured: Coming soon. -->
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  filters: any[]
  cookbooks: any[]
  featured?: any
}>()
</script>
