<template>
  <div class="four wide column">
    <img class="ui mini circular image" :src="imgUrl" :title="imgTitle">
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    imgUrl: String,
    imgTitle: String
  }
}
)</script>
