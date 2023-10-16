import { store } from '~~/store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.query._d && to.query.code) {
        const code = to.query.code
        const _d = to.query._d

        store.dispatch('set_active_user', {code, _d })
    }
    //TODO: remeber where user left off before signing in and redirect them back there as much as possible
})
