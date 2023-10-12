<template>
  <div>
    <div class="ui meals container" v-if="cookbooks.length > 0">
      <div class="meal section">
        <div class="content">
          <div class="ui grid">
            <div
              v-for="cookbook in cookbooks"
              :id="cookbook.id"
              :key="cookbook.slug"
              class="sixteen wide mobile column sixteen wide tablet column eight wide computer column eight wide large screen column"
            >
              <div class="serving card">
                <div class="image wrapper">
                  <div
                    class="image"
                    :style="{
                      'background-image': 'url(' + cookbook.bookCoverImg + ')',
                    }"
                  >
                    <span role="img" :aria-label="cookbook.alt_text"></span>
                  </div>
                </div>
                <div class="content">
                  <div class="ui sub header">
                    <span :style="{ float: 'right' }">
                      <span>proudly</span>
                      <span v-if="cookbook.flag">
                        <i
                          :class="generateFlagClass(cookbook.flag.flag)"
                          :title="cookbook.flag.nationality"
                        ></i>
                      </span>
                      <span v-else> Universal </span>
                    </span>
                  </div>
                  <div class="ui labels">
                    <a
                      v-for="category in cookbook.categories"
                      :key="category.name"
                      class="ui tiny label"
                      :style="{
                        'background-color': getBgColor(category.color),
                      }"
                    >
                      <span>{{ category.name }}</span>
                      <span v-html="category.emoji"></span>
                    </a>
                  </div>
                  <div class="ui medium header cookbook-title">
                    {{ cookbook.name }}
                  </div>
                  <div class="tvn vertical fade clipped description">
                    {{ cookbook.description }}
                  </div>
                  <div class="footer options">
                    <span>
                      <NuxtLink :to="`/cookbooks/${cookbook.slug}`">
                        <button class="ui primary left floated basic button">
                          {{ cookbook.recipes.length }} Recipe(s)
                        </button>
                      </NuxtLink>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span style="float: right !important">
          <a href="/#/search?q=cookbooks">
            see all <i class="ui arrow down icon"></i>
          </a>
        </span>
      </div>
      <br /><br />
      <div class="tvn horizontal stroke"></div>
    </div>
    <div class="ui sixteen wide column" v-else>
      <NothingToShowYou :htmlText="followUpText" />
      <div class="tvn horizontal stroke"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      followUpText: '',
    }
  },
  props: {
    cookbooks: Array<any>,
  },
  methods: {
    generateFlagClass(code) {
      return `${code} flag`
    },
    getBgColor(code) {
      return `#${code}`
    },
  },
})
</script>

<style scoped>
a.ui.label {
  cursor: none !important;
  text-transform: capitalize !important;
}

.cookbook-title {
  text-transform: capitalize;
}
</style>
