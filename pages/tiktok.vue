<template><div></div></template>
<script setup lang="ts">
definePageMeta({
  middleware() {
    const config = useRuntimeConfig()
    const queryString = window.location.href
    const replaced = queryString.replace('/##/', '/')
    const url = new URL(replaced)

    let code = url.searchParams.get('token')
    let username = url.searchParams.get('_d')

    if (!username) username = 'test-user'
    if (!code) code = config.public.devToken

    const router = useRouter()
    return router.replace({ name: 'index', query: {'code': code, '_d': username}})
  },
})
</script>
