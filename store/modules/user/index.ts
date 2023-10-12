import { makeRequest } from '~~/utils/makeRequest'

const state = () => ({
    success: false,
    who_to_follow: []
})
const mutations = {
    LOAD_WHO_TO_FOLLOW_LIST(state, data) {
        state.who_to_follow = data.sort(() => Math.random() - 0.5);
    }
}
const actions = {
    async followUser(context, payload) {
        try {
            const response = await makeRequest('follow', {
                method: 'POST',
                data: {
                    toFollow: payload.following,
                },
                headers: {
                    Authorization: 'Bearer ' + this.state.access_token
                },
            })

            if (response.data.length > 0) {
                context.commit('LOAD_WHO_TO_FOLLOW_LIST', response.data)
            }
        } catch (error) {
            console.error('follow-error', error)
        }
    },
    async update_user(context, payload) {
        context.commit('SET_LOADING_STATE', true)
        try {
            await makeRequest(`users/${payload.name_slug}`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + payload.token,
                },
            })
            context.commit('SET_LOADING_STATE', false)
            window.location.href = '/'
        } catch (error) {
            const router = useRouter()
            if (error.response.status === 401) {
                context.commit('LOGOUT')
                router.push({ path: '/' })
            }
            context.commit('SET_LOADING_STATE', false)
        }
    },
    async get_who_to_follow(context) {
        try {
            const whoToFollowData = await makeRequest('who-to-follow', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.state.access_token
                },
            })
            context.commit('LOAD_WHO_TO_FOLLOW_LIST', whoToFollowData.data)
        } catch (error) {
            context.commit('HANDLE_ERROR', error.response);
        }
    }
}

export default {
    mutations,
    actions,
    state,
}
