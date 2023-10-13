import { createStore } from 'vuex'
// import { makeRequest } from '~~/utils/makeRequest'

const mutations = {

    // UPDATE_ACTIVE_USER(state, newState) {
    //     this.state.active_user = newState.data.user[0]
    // },
}
const actions = {
    // async fetch_active_user(context, username) {
    //     try {
    //         const response = await makeRequest(`users/${username}`)
    //         context.commit('UPDATE_ACTIVE_USER', response.data)
    //     } catch (error) {
    //         console.error('fetch active user error', error.response)
    //     }
    // },
}

export default createStore({
    mutations,
    actions,
})
