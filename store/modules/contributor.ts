import { createStore } from 'vuex'
import { makeRequest } from '~~/utils/makeRequest'

const mutations = {
    UPDATE_CONTRIBUTOR_OBJECT(state, newState) {
        this.state.contributor = newState.data.user[0]
    },
    UPDATE_ACTIVE_USER(state, newState) {
        this.state.active_user = newState.data.user[0]
    },
}
const actions = {
    async fetch_contributor(context, username) {
        context.commit('SET_LOADING_STATE', true)
        try {
            const response = await makeRequest(`users/${username}`)
            context.commit('UPDATE_CONTRIBUTOR_OBJECT', response.data)
            context.commit('SET_LOADING_STATE', false)
        } catch (error) {
            console.error('fetch contributor error', error.response)
        }
    },
    async fetch_active_user(context, username) {
        try {
            const response = await makeRequest(`users/${username}`)
            context.commit('UPDATE_ACTIVE_USER', response.data)
        } catch (error) {
            console.error('fetch active user error', error.response)
        }
    },
}

export default createStore({
    mutations,
    actions,
})
