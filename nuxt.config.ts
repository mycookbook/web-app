// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',
    // Public keys that are exposed to the client
    public: {
      apiBaseUrl: process.env.BASE_URL,
      ipInfoUri: 'https://ipinfo.io',
      ipInfoToken: process.env.IPINFO_TOKEN,
    },
  },
})
