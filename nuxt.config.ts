// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    tsConfig: {
      includes: ['jquery'],
    },
  },
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',
    // Public keys that are exposed to the client
    public: {
      appUrl: process.env.APP_URL,
      apiBaseUrl: process.env.BASE_URL,
      aws: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKey: process.env.AWS_ACCESS_KEY,
        bucket: process.env.AWS_BUCKET,
        region: process.env.AWS_REGION,
      },
      devToken: process.env.DEV_TOKEN,
      ipInfoUri: 'https://ipinfo.io',
      ipInfoToken: process.env.IPINFO_TOKEN,
      talkifyKey: process.env.TALKIFY_KEY,
      tiktokClientKey: process.env.TIKTOK_CLIENT_KEY,
      serverOauthEndpoint: process.env.SERVER_ENDPOINT_OAUTH,
    },
  },
  head: {
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.min.js',
        integrity: 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=',
        crossorigin: 'anonymous',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.6/semantic.min.js',
      },
    ],
  },
  css: ['semantic-ui-css/semantic.min.css', '@/assets/css/style.css'],
})
