<template>
  <div>
    <div class="hideshowicon">
      <div v-if="inEditMode">
        expand to create new<i
          class="ui chevron down icon"
          @click="toggleEditor('show')"
        ></i>
      </div>
      <div v-else>
        hide editor<i
          class="ui chevron up icon"
          @click="toggleEditor('hide')"
        ></i>
      </div>
    </div>
    <br />

    <div v-if="!inEditMode" id="cookbook-editor">
      <div>
        <UploadImage
          :description="uploadMessageDescription"
          :acceptTypes="acceptTypes"
          :imageDimensionMsg="imageDimensionMsg"
        />
      </div>
      <div class="ui horizontal divider"></div>
      <div class="ui form">
        <div class="field">
          <label>Image alt Text (optional)</label>
          <input
            v-model="alt_text"
            type="text"
            placeholder="Optional but strongly recommended"
          />
        </div>
      </div>
      <br />
      <div class="ui form">
        <div class="field">
          <label>Title (required*)</label>
          <input
            v-model="cookbook_title"
            type="text"
            placeholder="Enter title"
          />
        </div>
      </div>
      <br />
      <div class="ui form">
        <div class="field">
          <label>About this Cookbook? (required*)</label>
          <textarea
            v-model="description"
            placeholder="A very good description will be about 300 characters long. This tells users what this cookbook is about. it may encourage users to add to your cookbook thereby increasing your visibility. Make the best use for it, good luck!"
          ></textarea>
        </div>
      </div>
      <br />
      <div class="ui form">
        <div class="field">
          <label>Select up to 3 categories (required*)</label>
          <div>
            <div class="ui labels">
              <a
                v-for="cat in _categories"
                :key="cat.slug"
                class="ui label"
                :style="{ 'background-color': '#' + cat.color }"
                @click="selectedCategory(cat.slug)"
              >
                {{ cat.name }}
              </a>
            </div>
          </div>
          <input
            v-model="selectedCategories"
            type="text"
            placeholder="Your selected categories show up here"
          />
          <br /><br />
        </div>
      </div>
      <br />
      <div class="ui form">
        <div class="field">
          <label>
            <span> Country Flag (Optional) </span>
            <span style="float: right !important">
              <a
                href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
                target="_blank"
              >
                <i class="ui wikipedia icon"></i>
              </a>
            </span>
          </label>
          <input
            v-model="flag"
            type="text"
            placeholder="Enter ISO code e.g ca for Canada, us for USA, ng for Nigeria"
          />
        </div>
      </div>
      <br />
      <div class="ui form">
        <div class="field">
          <label>
            <span> Keywords (Optional) </span>
          </label>
          <input
            v-model="keywords"
            type="text"
            placeholder="e.g #goals, #tiktok, #goals"
          />
        </div>
      </div>

      <div class="ui horizontal divider"></div>

      <div class="ui grid">
        <div class="six wide computer column sixteen wide mobile column">
          <button class="fluid ui black outline button" @click="saveAsDraft()">
            Save as draft
          </button>
        </div>
        <div class="ten wide computer column sixteen wide mobile column">
          <button class="fluid ui tbb button" @click="save()">Save</button>
        </div>
      </div>
    </div>

    <div class="ui horizontal divider">
      <i class="camera icon"></i>
    </div>

    <div>
      <div class="ui horizontal divider"></div>
      <div v-if="_myCookbooks.length < 1">
        <em>You have no cookbooks.</em>
      </div>
      <div v-else>
        <div class="ui items">
          <div
            v-for="cookbook in _myCookbooks"
            :key="cookbook.slug"
            class="item"
          >
            <div class="ui tiny image">
              <img :src="cookbook.bookCoverImg" />
            </div>
            <div class="content">
              <a class="header" href="">
                <small>
                  <span>
                    <NuxtLink :to="`/cookbooks/${cookbook.slug}`">
                      {{ cookbook.name }}
                    </NuxtLink>
                  </span>
                </small>
              </a>
              <span style="float: right !important; font-size: 16px">
                <NuxtLink :to="`/cookbooks/${cookbook.slug}`">
                  edit |
                </NuxtLink>
                <NuxtLink :to="`/dashboard/?tab=Drafts`"> add recipe </NuxtLink>
              </span>
              <div class="meta">
                <span>
                  {{ truncate(cookbook.description, 115, '...') }}
                </span>
              </div>
              <div class="description">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  mounted() {
    const username = this.$store.state.username
    this.$store.dispatch('fetch_contributor', username)
  },
  computed: {
    _categories() {
      const contents =
        this.$store.state.cookbookStore.definitions.categories.contents
      return JSON.parse(contents)
    },
    _myCookbooks() {
      return this.$store.state.contributor.cookbooks
    },
  },
  data() {
    return {
      inEditMode: true,
      uploadMessageDescription: 'Upload Cookbook Cover Image',
      imageDimensionMsg: 'Image dimension for best results (1127 x 650px)',
      acceptTypes: '.png',
      selectedCategories: '',
      cookbook_title: '',
      description: '',
      keywords: '',
      alt_text: '',
      flag: '',
    }
  },
  methods: {
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    },
    toggleEditor(action) {
      if (action === 'hide') {
        $('#cookbook-editor').addClass('show')
        $('#cookbook-editor').removeClass('hide')
      }

      if (action === 'show') {
        $('#cookbook-editor').removeClass('show')
        $('#cookbook-editor').addClass('hide')
      }

      this.inEditMode = !this.inEditMode
    },
    selectedCategory(slug) {
      let selected = this.selectedCategories + ', '

      selected += slug + ', '

      this.selectedCategories = selected.slice(0, -2)

      if (this.selectedCategories.substring(0, 1) === ',') {
        this.selectedCategories = selected.slice(0, -2).substring(1)
      }
      const chars = this.selectedCategories.split(',')
      const uniqueChars = chars.filter((c, index) => {
        return chars.indexOf(c) === index
      })

      this.selectedCategories = uniqueChars.toString()
    },
    save() {
      this.$store.dispatch('create_cookbook', this.getPayload())
    },
    saveAsDraft() {
      this.$store.dispatch('save_as_draft', this.getPayload())
    },
    getPayload() {
      return {
        name: this.cookbook_title,
        description: this.description,
        categories: this.selectedCategories.trim(),
        flag_id: this.flag,
        keywords: this.keywords,
        bookCoverImg:
          'https://media-exp1.licdn.com/dms/image/C5603AQGKdRvQJbmLqw/profile-displayphoto-shrink_400_400/0/1662683412684?e=1670457600&v=beta&t=wiLPkRzrltHPOsudDg6lyo3Tg4NzTANQaa7g78i_Pss',
        user_id: this.$store.state.username,
        alt_text: this.alt_text,
      }
    },
  },
})
</script>

<style scoped>
.hideshowicon i {
  cursor: pointer !important;
}

.show {
  display: inline;
}

.hide {
  display: none !important;
}
</style>
