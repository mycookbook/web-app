<template>
    <div></div>
</template>

<script setup lang="ts">
definePageMeta({
    async middleware() {
        const config = useRuntimeConfig()
        const route = useRoute()
        const router = useRouter()

        let code = route.query.token
        let username = route.query._d

        if (!username && !code) {
            const response = await Promise.resolve(makeRequest('auth/login', {
                method: 'POST',
                data: {
                    email: config.public.devEmail,
                    password: config.public.devPass
                }
            }))
            
            username = config.public.devUser
            code = response.data.token
        }

        return router.replace({ name: 'index', query: { 'code': code, '_d': username } })
    },
})
</script>
