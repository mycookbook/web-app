<script setup lang="ts">
definePageMeta({
  middleware() {
    const config = useRuntimeConfig()
    const queryString = window.location.href
    const replaced = queryString.replace('/#/', '/')
    const url = new URL(replaced)
    let code = url.searchParams.get('token')
    let username = url.searchParams.get('_d')

    if (!username) username = 'test-user'
    if (!code) code = config.public.devToken
    this.$store.dispatch('set_active_user', {
      code,
      username,
    })
    this.$store.dispatch('fetch_active_user', username)
  },
})
</script>
