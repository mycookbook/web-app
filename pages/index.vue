<template>
  <div>
    <div class="ui container">
      <div>
        <Navigation />
        <div v-if="!userIsLoggedIn">
          <Search />
        </div>
        <br />
        <br />
        <div v-if="!loaded()">
          <SkeletonDefault />
        </div>
        <div v-else>
          <div v-if="userIsLoggedIn">
            <FeedDisplay />
          </div>
          <div v-else>
            <QuickSort :filters="filters()" :cookbooks="cookbooks()" />
          </div>

          <ContactForm />
          <BottomNav />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    userIsLoggedIn() {
      return this.$store.state.access_token
    },
  },
  mounted() {
    this.$store.dispatch('boot')
  },
  methods: {
    loaded() {
      if (
        this.$store.state.cookbookStore.cookbooks !== undefined &&
        this.$store.state.cookbookStore.definitions.categories.contents !==
          undefined
      ) {
        return true
      }
    },
    cookbooks() {
      return this.$store.state.cookbookStore.cookbooks
    },
    filters() {
      return JSON.parse(
        this.$store.state.cookbookStore.definitions.categories.contents
      )
    },
  },
})
</script>
