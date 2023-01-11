<template>
  <div class="categories-quick-search-wrapper">
    <div class="ui grid">
      <div
        class="ui sixteen wide computer column sixteen wide tablet column sixteen wide mobile column"
      >
        <h3>Explore latest cookbooks</h3>
      </div>
    </div>
    <div class="ui grid">
      <div
        class="sixteen wide computer column sixteen wide tablet column mobile hidden"
      >
        <div v-if="filters" class="ui secondary menu flex-container">
          <a id="all" class="active item tbb" @click="getCategoryName('all')"
            >All</a
          >
          <a
            v-for="filter in filters"
            :id="filter.slug"
            :key="filter.name"
            class="item"
            :title="filter.name"
            @click="getCategoryName(filter.slug)"
          >
            {{ filter.name }}
          </a>
          <a id="location" class="item" @click="getCategoryName('location')"
            >Current Location</a
          >
          <a class="item" title="view all">
            <i class="ellipsis horizontal icon"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="ui grid">
      <div v-if="filters" class="ui sixteen wide mobile column mobile only">
        <select
          v-model="searchBy"
          style="font-size: 0.7em !important"
          class="ui search fluid dropdown"
          @change="doSomething()"
        >
          <option value="all">All</option>
          <option
            v-for="filter in filters"
            :key="filter.slug"
            :value="filter.slug"
          >
            {{ filter.name }}
          </option>
          <option value="location">Current Location</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    filters: Array<any>,
  },
  data() {
    return {
      searchBy: 'all',
    }
  },
  methods: {
    getCategoryName: function (category) {
      this.selectActive(category)
      this.$store.dispatch('sort', category)
    },
    selectActive: function (category) {
      $('.item').removeClass('active')
      $('.item').removeClass('tbb')
      let el = '#' + category
      $(el).addClass('active')
      $(el).addClass('tbb')
    },
    doSomething() {
      this.getCategoryName(this.searchBy)
    },
  },
})
</script>

<style scoped>
.categories-quick-search-wrapper {
  margin-top: 5% !important;
  background-color: #fcfcfc !important;
  padding: 4% !important;
}
.categories-quick-search-wrapper p {
  color: #999999 !important;
  font-weight: 300;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.categories-quick-search-wrapper h3 {
  margin-top: 0px !important;
  margin-bottom: 30px !important;
  font-size: 22px !important;
  line-height: 26px !important;
  font-weight: 600 !important;
}
</style>
