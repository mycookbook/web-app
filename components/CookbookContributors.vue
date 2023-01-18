<template>
  <div class="ui segment">
    <div class="ui item count">
      <b>{{ contributors.length }} contributor(s) </b><br />
      Including {{ author }} and {{ contributors.length - 1 }} other(s)
    </div>
    <div class="ui mini images">
      <div
        v-for="contributor in contributors.slice(0, 10)"
        :key="contributor.id"
        class="ui image"
      >
        <img
          class="ui circular image contributor-avatar"
          :title="contributor.name"
          :src="contributor.avatar"
        />
      </div>
      <div class="ui image">
        <a
          v-if="contributors.length > 10"
          class="ui circular large label"
          style="margin-top: -15% !important"
        >
          + {{ contributors.length - 10 }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    contributors: Array<any>,
    author: String,
  },
})
</script>

<style scoped>
.contributor-avatar {
  height: 32px !important;
}
.count {
  font-size: 0.89em !important;
  color: rgba(0, 0, 0, 0.5);
  padding-bottom: 15px;
}
</style>
