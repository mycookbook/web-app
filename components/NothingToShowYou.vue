<template>
  <div class="ui container" style="text-align: center !important">
    <div>
      <p class="ui item button">
        <i class="ui terminal icon"></i>
        Nothing to show you
      </p>
    </div>
    <small v-html="htmlText"></small>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    htmlText: String,
  },
})
</script>
