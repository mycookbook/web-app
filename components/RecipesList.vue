<template>
  <div>
    <br />
    <div class="ui success small message">
      To start contributing to this cookbook is very easy! Simply hit the
      <a href="http://localhost:5001/#/signin">signin</a> button and start
      contributing to this cookbook and many more cookbooks on this platform!
    </div>
    <div class="ui horizontal divider">
      <i class="camera icon"></i>
    </div>
    <div class="ui header">
      <span
        >Showing
        {{ incrementBy > recipes.length ? recipes.length : incrementBy }} of
        {{ recipes.length }} recipes in "{{ cookbookName }}"
      </span>
    </div>
    <div>
      <span>sort by </span>
      <span>
        <small>
          <a class="link" @click="sortBy('newest')"> Most Recent | </a>
        </small>
      </span>
      <span>
        <small>
          <a class="link" @click="sortBy('oldest')"> Oldest </a>
        </small>
      </span>
    </div>

    <div v-if="recipes.length > 0" style="margin-left: 10%">
      <br />
      <div v-for="recipe in recipes" :key="recipe.id" class="ui card">
        <NuxtLink :to="`/recipes/${recipe.slug}`">
          <div class="ui link cards" title="click to view recipe">
            <div class="card">
              <div class="ui fluid image">
                <a
                  v-if="recipe.created_at == 'just now'"
                  class="ui red right ribbon label"
                >
                  NEW
                </a>
                <img :src="recipe.imgUrl" />
              </div>
              <div class="content">
                <div class="header">{{ recipe.name }}</div>
                <div class="meta">
                  Recipe by: <b>{{ recipe.author.name }}</b>
                </div>
                <div class="description">
                  {{ recipe.summary }}
                </div>
              </div>
              <div class="extra content">
                <span class="left floated">
                  <i class="ui clock icon"></i>Prep & Cook Time 45 Mins
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-if="recipesSlice.length >= recipes.length">
        <span>
          <p>no more recipes.</p>
        </span>
        <span style="float: right !important">
          <a style="cursor: pointer !important" @click="scrollToTop()">
            <i class="ui long arrow alternate up icon"></i>Scroll To Top
          </a>
        </span>
      </div>
      <div v-else>
        <a class="link" @click="showMore()"> Show more </a>
      </div>
    </div>
    <div v-else>
      <NothingToShowYou :htmlText="htmlText" style="margin-top: 50%" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    recipes: Array<any>,
    cookbookId: Number,
    cookbookName: String,
  },
  data() {
    return {
      incrementBy: 5,
      recipesSlice: this.recipes.slice(0, 5),
      htmlText:
        '<a href="https://contribute.cookbookshq.com/login">Login</a> to your contributor account to start adding recipes.',
      searchText: '',
      searchBy: 'recipe',
    }
  },
  methods: {
    showMore() {
      this.recipes = this.recipes.slice(0, this.getBy())
    },
    getBy() {
      if (this.recipes.length === this.incrementBy) {
        return (this.incrementBy += 5)
      }

      return this.incrementBy
    },
    sortBy(order) {
      this.recipes.sort(function (a, b) {
        const dateA = Date.parse(a.created_at)
        const dateB = Date.parse(b.created_at)

        if (order === 'oldest' && dateA < dateB) {
          return -1
        }

        if (order === 'oldest' && dateA > dateB) {
          return 1
        }

        if (order === 'newest' && dateA > dateB) {
          return -1
        }

        if (order === 'newest' && dateA < dateB) {
          return 1
        }

        return 0
      })
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
})
</script>

<style scoped>
.link {
  cursor: pointer !important;
}

.card {
  display: inline-flex !important;
  margin-right: 10px !important;
}

.card .image img {
  height: 275px !important;
}
</style>
