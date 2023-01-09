import { makeRequest } from '~~/utils/makeRequest'

const state = () => ({
  success: false,
})
const actions = {
  async followUser(context, payload) {
    try {
      const response = await makeRequest('follow', {
        method: 'POST',
        data: {
          recipe_id: payload.recipeId,
        },
      })
      if (response.data.updated) {
        context.commit('INCREMENT_CLAP', response.data.claps)
      }
    } catch (error) {
      console.error('clapping error', error.response)
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
}

export default {
  actions,
  state,
}
