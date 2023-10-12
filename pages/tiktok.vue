<template><div></div></template>
<script setup lang="ts">
definePageMeta({
  middleware() {
    const config = useRuntimeConfig()
    const route = useRoute()
    const router = useRouter()

    let code = route.query.token
    let username = route.query._d

    if (!username) username = config.public.devUser
    if (!code) code = config.public.devToken

    return router.replace({ name: 'index', query: {'code': code, '_d': username}})
  },
})
</script>
