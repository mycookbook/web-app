import { makeIpInfoRequest, makeRequest } from '~~/utils/makeRequest'

const state = () => ({
    cookbooks: [],
    cookbook: {},
    definitions: {
        categories: [],
        nutritional_details: [],
    },
    sorted: [],
    seeMore: true,
})
const mutations = {
    STORE_COOKBOOKS(state, cookbooks) {
        state.cookbooks = cookbooks
        localStorage.setItem('unfiltered', JSON.stringify(cookbooks)) // immutable state for filtering through cookbooks list
    },
    STORE_DEFINITIONS(state, definitions) {
        state.definitions.categories = definitions[0]
        state.definitions.nutritional_details = definitions[1]
    },
    async SORT(state, payload) {
        const unfiltered = JSON.parse(localStorage.getItem('unfiltered'))

        if (payload === 'all') {
            state.cookbooks = unfiltered
        } else if (payload === 'location') {
            state.cookbooks = unfiltered
            try {
                const { data } = await makeIpInfoRequest()
                localStorage.setItem('selectedFlag', data.country)
                const filtered = state.cookbooks.filter(
                    (c) => c.flag.flag === data.country.toLowerCase()
                )
                state.cookbooks = filtered
            } catch (error) { }
        } else {
            state.cookbooks = unfiltered
            const filtered = state.cookbooks.filter((c) => {
                if (c.categories.length > 0) {
                    const filteredCategories = JSON.parse(JSON.stringify(c.categories))
                    for (let i = 0; i < filteredCategories.length; i++) {
                        if (filteredCategories[i].slug === payload) {
                            return filteredCategories
                        }
                    }
                }
                return false
            })
            state.cookbooks = filtered
        }
    },
    UPDATE_COOKBOOK_STATE(_, newState) {
        this.state.cookbook = newState
    },
    SEE_MORE_OR_LESS(state) {
        state.seeMore = !state.seeMore
    },
}
const actions = {
    sort(context, payload) {
        context.commit('SORT', payload)
    },
    see_more_or_less(context) {
        context.commit('SEE_MORE_OR_LESS')
    },
    async fetch_cookbook(context, cookbookId) {
        context.commit('SET_LOADING_STATE', true)
        try {
            const response = await makeRequest(`cookbooks/${cookbookId}`)
            // context.commit('UPDATE_COOKBOOK_STATE', response.data)
            // context.commit('SET_LOADING_STATE', false)
        } catch (error) {
            // context.commit('SET_LOADING_STATE', false)
        }
    },
    async create_cookbook(context, payload) {
        context.commit('SET_LOADING_STATE', true)
        try {
            await makeRequest('cookbooks', {
                method: 'POST',
                data: payload,
                headers: {
                    Authorization: `Bearer ${this.state.access_token}`,
                },
            })
            location.reload()
        } catch (error) {
            if (error?.response?.status === 401) {
                const router = useRouter()
                context.commit('LOGOUT')
                router.push({ path: '/' })
            }
        }
    },
    save_as_draft(context) {
        context.commit('SET_LOADING_STATE', true)
    },
}
export default {
    mutations,
    actions,
    state,
}
