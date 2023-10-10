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
      apiBaseUrl: "https://api.cookbookshq.com/api/v1/",
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
  app: {
    head: {
      title: 'Cookbook inc.',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content:
            'Cookbooks HQ is the app that lets you peek around anonymously for recipes for absolutely no fee atall! until you decide to no longer be anonymous. You can register to become a contributor to start adding recipes to the global recipes base.',
        },
        {
          name: 'keywords',
          content:
            'recipes, cookbooks, recipes varieties, free recipes, free cookboks, create and learn, gloabl, intercontinental, vegan, homemade, all recipes, ketogenic, health and wellness, fit fam',
        },
        {
          name: 'author',
          content: 'Cookbooks HQ',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.6/semantic.min.css',
        },
      ],
      script: [
        {
          src: 'https://code.jquery.com/jquery-3.3.1.min.js',
          integrity: 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=',
          crossorigin: 'anonymous',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/talkify-tts@2.1.2/dist/talkify.min.js',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.6/semantic.min.js',
        },
      ],
    },
  },
  css: ['@/assets/css/style.css'],
})
