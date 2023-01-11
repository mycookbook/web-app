<template>
  <div v-show="completed">
    <div v-show="hasError" class="ui message error">
      <ul v-for="(error, idx) in errors" :key="idx">
        <li>
          {{ error[0] }}
        </li>
      </ul>
    </div>
    <div v-show="!hasError" class="ui message success">
      <ul>
        {{
          successMsg
        }}
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    hasError: Boolean,
    completed: Boolean,
    errors: Array<any>,
    successMsg: String,
  },
})
</script>
