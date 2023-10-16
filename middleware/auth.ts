import { store } from '~~/store'

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (to.query._d && to.query.code) {
        const code = to.query.code
        const _d = to.query._d

        store.dispatch('set_active_user', { code, _d })
    }

    if (!Object.is(store.state.access_token, null)) {
        //check if session has expired
        const accessToken = store.state.access_token
        const result = await makeTokenValidationRequest(accessToken)

        if (!result.data.validated) {
            store.dispatch('logout')
            return navigateTo('/signin')
        }
    }

    let pagesTrack = {
        'cookbooks-slug': 'cookbooks/',
        'recipes-slug': 'recipes/'
    }

    let curr_route: string = to.name as string

    if (pagesTrack.hasOwnProperty(curr_route)) {
        store.state.smart_redirects = {
            from: to,
            path_: pagesTrack[curr_route]
        }
    }

    if (
        store.state.smart_redirects.hasOwnProperty("from") &&
        pagesTrack.hasOwnProperty(store.state.smart_redirects.from.name)
    ) {
        store.state.smart_redirects.shouldRedirect = true
    }
})
