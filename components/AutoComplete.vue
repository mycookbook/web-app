<template>
  <div class="ui massive search search-container">
    <div class="ui icon large fluid input">
      <input
        id="searchInput"
        v-model="query"
        type="text"
        placeholder='Try "banana bread recipe"'
        class="prompt"
        @keyup="search"
      />
      <i class="search icon sicon"></i>
    </div>
    <div v-show="searching" class="search-results">
      <div
        v-if="results.length == 0"
        class="ui divided selection list"
        style="text-transform: capitalize"
      >
        <div class="item description">
          <small>
            no results.
            <em>
              Know how to prepare <span id="qStr">{{ qStr }}</span
              >? <a href="/register">Add it</a>
            </em>
          </small>
          <hr />
        </div>
      </div>
      <div v-else>
        <div class="ui divided selection list capitalize">
          <a
            v-for="result in results.slice(0, 5)"
            :key="result.slug"
            class="item"
            @click="redirectTo(result)"
          >
            <div
              :class="getClass(result.resource_type)"
              style="text-transform: capitalize"
            >
              {{ result.resource_type }}
            </div>
            <em>
              <span>
                {{
                  result.resource_type == 'cookbook'
                    ? result.cookbook_name
                    : result.recipe_name
                }}
              </span>
              <span
                v-if="result.resource_type == 'recipe' && result.is_orderable"
              >
                <small class="ui mini label">
                  Available for placing orders
                </small>
              </span>
            </em>
            <div class="description">
              <span
                v-if="result.resource_type == 'cookbook'"
                class="ui left floated"
              >
                {{ truncate(result.description, 115, '...') }}
              </span>
              <span
                v-if="result.resource_type == 'recipe'"
                class="ui left floated"
              >
                {{ truncate(result.summary, 115, '...') }}
              </span>
              <span
                v-if="result.resource_type == 'cookbook'"
                class="ui right floated meta"
              >
                <img class="ui mini image" :src="result.bookCoverImg" />
              </span>
              <span
                v-if="result.resource_type == 'recipe'"
                class="ui right floated meta"
              >
                <img class="ui mini image" :src="result.imgUrl" />
              </span>
              <span
                v-if="result.resource_type == 'recipe_variation'"
                class="ui right floated meta"
              >
                <img class="ui mini image" :src="result.imgUrl" />
              </span>
            </div>
          </a>
        </div>
        <div class="fluid ui button">
          <NuxtLink :to="`/search?q=${qStr}`"> View all </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { makeRequest } from '~~/utils/makeRequest'

export default defineNuxtComponent({
  data() {
    return {
      searching: false,
      qStr: '',
      results: [],
      query: '',
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
    async search(e) {
      if (this.query.length > 3) {
        if (e.which === 13) {
          this.$store.dispatch('post_to_ml_endpoint', this.query)
          this.$router.push({ path: `/search?q=${this.query}` })
        }

        this.results = []
        this.qStr = this.query

        try {
          const response = await makeRequest('search', {
            headers: {
              'X-API-KEY': 'SijjocvGGcgnXVbXzSoVtmN5qPor0jl8PnlRJ25U26JCODpoyi',
            },
            params: {
              query: this.query,
            },
          })
          if (Object.keys(this.results).length === 0) {
            this.results = response.data.response
            this.$store.dispatch('post_to_ml_endpoint', this.query)
          }
        } catch (error) {
          console.error('search error', error.response.data)
        }
        this.searching = this.qStr
      }
    },
    getClass(type) {
      const style = 'ui horizontal label'
      const typeStyle = {
        cookbook: 'red',
        recipe: 'purple',
        recipe_variation: 'teal',
      }
      return `${style} ${typeStyle[type]}`
    },
    getLink(item) {
      let link = ''

      if (item.resource_type === 'cookbook') {
        link = 'cookbooks/' + item.id
      }

      if (item.resource_type === 'recipe') {
        link = '/recipes/' + item.id
      }

      return link
    },
    redirectTo(result) {
      const { resource_type: resourceType, slug } = result
      this.$router.replace(`/${resourceType}s/${slug}`)
    },
  },
})
</script>

<style>
.sicon {
  color: #0160cc;
}

.prompt {
  font-weight: 300;
  line-height: 200%;
  padding-left: 40px;
  border-radius: 0 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  background-color: #ffffff !important;
}

.search-container {
  width: 80%;
  margin: auto;
}

.selection .description {
  font-size: small;
}

.selection .description .meta {
  font-weight: bold;
}

#qStr {
  background-color: yellow !important;
}

.capitalize {
  text-transform: capitalize;
}

#searchInput::placeholder {
  font-size: 0.8em;
  color: #eeeeee;
  font-style: italic;
}
</style>
