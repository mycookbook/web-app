<template>
  <div class="ui container">
    <Navigation />
    <br /><br />
    <div class="ui container" style="margin-top: 25vh">
      <div class="ui center aligned grid">
        <div class="ui sixteen wide computer column sixteen wide mobile column">
          <div class="ui vertical labeled icon buttons">
            <button
              class="ui large black button"
              @click="authRedirect('tiktok')"
            >
              <img
                class="ui icon"
                src="https://www.logo.wine/a/logo/TikTok/TikTok-Icon-Logo.wine.svg"
                style="margin-left: 12px !important"
              />
              Sign in with TikTok
            </button>
            <br />
            <button class="ui large button" @click="authRedirect('magicLink')">
              <i class="magic large icon"></i>
              Sign in with Magic Link
            </button>
          </div>
          <br /><br /><br />
          <div>
            <p style="margin-bottom: -4px !important">
              By signing in, you have agreed to our
            </p>
            <span>
              <a href="/terms-and-conditions">Terms &amp; Conditions, </a>
              <a href="/usage-policy">Usage</a> and
              <a href="/data-retention-policy">Data Retention Policies</a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <br /><br /><br /><br />
    <ContactForm />
    <BottomNav />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    isLoading() {
      return this.$store.state.resource_isLoading
    },
    errors() {
      return this.$store.state.form_errors.registration_form
    },
    success() {
      return this.$store.state.registerStore.success
    },
  },
  methods: {
    authRedirect(provider) {
      const config = useRuntimeConfig()
      if (provider === 'magicLink') {
        alert(
          'This feature is limited to ONLY authorized users. Please login with TikTok instead.'
        )
      } else if (process.env.NODE_ENV === 'development') {
        const router = useRouter()
        router.replace({ path: '/tiktok' })
        // window.location.href = `${config.public.appUrl}/tiktok`
      } else {
        let uriParams = {}

        const csrfState = Math.random().toString(36).substring(2)

        const oauthEndpoint = {
          tiktok: config.public.serverOauthEndpoint,
        }

        const url = new URL(oauthEndpoint[provider])

        uriParams = {
          client_key: config.public.tiktokClientKey,
          redirect_uri: 'https://api.cookbookshq.com/callback/tiktok',
          response_type: 'code',
          scope: 'user.info.basic,video.list',
          state: csrfState,
        }

        for (const param in uriParams) {
          url.searchParams.set(param, uriParams[param])
        }
        window.location.href = url.toString()
      }
    },
  },
})
</script>
