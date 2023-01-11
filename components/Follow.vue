<template>
  <div>
    <div class="ui horizontal list">
      <div v-if="toFollowList && toFollowList.length > 0">
        <div
          v-for="toFollow in toFollowList"
          :key="toFollow.author"
          class="item"
        >
          <div class="ui grid">
            <FourWideCircularImage
              :imgUrl="toFollow.avatar"
              :imgTitle="toFollow.author"
            />
            <div
              class="eight wide column"
              style="margin-left: -27px !important"
            >
              <div>
                <small>
                  <b>
                    <NuxtLink :to="`/contributors/${toFollow.handle}`">
                      {{ toFollow.author }}
                    </NuxtLink>
                  </b>
                </small>
              </div>
              <div>
                <small> {{ toFollow.followers }} followers </small>
              </div>
            </div>
            <div class="four wide column">
              <div style="float: left; margin-left: 20px !important">
                <div
                  class="ui tbb small circular button"
                  :class="{ disabled: !_isLoggedIn }"
                  @click="follow()"
                >
                  Follow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="item">
          <div class="ui grid">
            <div class="four wide column">
              <img
                class="ui mini circular image"
                :src="avatar"
                :title="author"
              />
            </div>
            <div
              class="seven wide column"
              style="margin-left: -27px !important"
            >
              <div>
                <small>
                  <b>
                    <NuxtLink :to="`/contributors/${handle}`">
                      {{ author }}
                    </NuxtLink>
                  </b>
                </small>
              </div>
              <div>
                <small> {{ followers }} followers </small>
              </div>
            </div>
            <div class="four wide column">
              <div class="">
                <div
                  class="ui tbb small circular button"
                  :class="{ disabled: !_isLoggedIn }"
                  @click="follow()"
                >
                  Follow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
class ToFollowUser {
  constructor(
    public author: string,
    public handle: string,
    public followers: string
  ) {
    this.author = author
    this.handle = handle
    this.followers = followers
  }
}
export default defineNuxtComponent({
  computed: {
    _profile() {
      return '/contributors/@' + this.handle
    },
    _isLoggedIn() {
      const hasSession = this.$store.state.access_token !== null
      this.isLoggedIn = hasSession
      return this.isLoggedIn
    },
  },
  props: {
    followers: String,
    author: String,
    avatar: String,
    handle: String,
    toFollowList: Array<ToFollowUser>,
  },
  data() {
    return {
      isLoggedIn: false,
    }
  },
  methods: {
    follow() {
      const hasSession = this.$store.state.access_token
      if (!hasSession) {
        this.$router.push('/signin')
      }
      this.$store.dispatch('followUser', {})
    },
  },
})
</script>
