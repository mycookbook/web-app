<template>
  <div>
    <div
      v-if="!isCopied"
      class="ui tbb fluid button"
      :title="tooltip"
      @click="CopyContents(htmlTagId)"
    >
      <i class="ui computer icon"></i>Copy
    </div>
    <div v-else class="ui disabled button">Copied</div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    htmlTagId: {
      type: String,
      default: null,
    },
    tooltip: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      copied: false,
    }
  },
  computed: {
    isCopied() {
      return this.copied
    },
  },
  methods: {
    CopyContents(htmlTagId: string) {
      let node
      if (htmlTagId && (node = document.getElementById(htmlTagId))) {
        const message = document.createRange()
        message.selectNode(node)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(message)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        navigator.clipboard.writeText(message.toString())

        this.copied = true
      }
    },
  },
}
</script>
