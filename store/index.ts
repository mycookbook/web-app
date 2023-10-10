import { createStore } from 'vuex'

// modules
import {
  varietiesStore,
  cookbookStore,
  recipeStore,
  subscriptionStore,
  registerStore,
  contributorStore,
  searchStore,
  userStore,
} from './modules'

import { makeRequest } from '~~/utils/makeRequest'

export interface State {
  policies: any
}

export const store = createStore({
  state() {
    return {
      resource_isLoading: false,
      policies: {
        cookiePolicy: '',
        usagePolicy: '',
        dataRetentionPolicy: '',
        termsAndConditons: '',
      },
      form_errors: {
        registration_form: {},
        contact_form: {},
      },
      response: {
        statuses: {
          unauthorized: 401,
          unprocessible: 422,
          ok: 200,
          server: 500,
        },
      },
      access_token: null,
      active_user: {},
      contributor: {},
      username: null,
    }
  },
  actions: {
    async boot(context) {
      try {
        const [
          { data: definitionData },
          { data: cookbooksData },
          { data: policiesData },
        ] = await Promise.all([
          makeRequest('https://api.cookbookshq.com/api/v1/definitions'),
          makeRequest('https://api.cookbookshq.com/api/v1/cookbooks'),
          makeRequest('https://api.cookbookshq.com/api/v1/policies'),
        ])

        context.commit('SET_LOADING_STATE', false)
        context.commit('STORE_DEFINITIONS', definitionData)
        context.commit('STORE_COOKBOOKS', cookbooksData.data)
        context.commit('STORE_POLICIES', policiesData)
      } catch (error) {
        if (
          error.response &&
          error.response.status === this.state.response.statuses.unauthorized
        ) {
          context.commit('SET_LOADING_STATE', true)
          console.log('malformed request, check headers')
        } else {
          console.error('must be a server error', error)
        }
        context.commit('SET_LOADING_STATE', false)
      }
    },
    unload_global_error_object(context) {
      context.commit('UNLOAD_GLOBAL_ERROR_OBJECT')
    },
    unload_global_success_object(context) {
      context.commit('UNLOAD_GLOBAL_SUCCESS_OBJECT')
    },
    load_skeleton(context) {
      context.commit('SET_LOADING_STATE', true)
    },
    set_active_user(context, payload) {
      const router = useRouter()
      context.commit('SET_ACTIVE_USER', {
        accessToken: payload.code,
        userName: payload.username,
      })
      router.replace({ path: '/' })
    },
    logout(context) {
      const router = useRouter()
      context.commit('LOGOUT')
      router.push({ path: '/' })
    },
  },
  getters: {
    get_cookie_policy: (store) => () => {
      return store.policies.cookiePolicy
    },
    get_data_retention_policy: (store) => () => {
      return store.policies.dataRetentionPolicy
    },
    get_terms_and_conditions: (store) => () => {
      return store.policies.termsAndConditons
    },
    get_usage_policy: (store) => () => {
      return store.policies.usagePolicy
    },
  },
  mutations: {
    STORE_POLICIES(state, policies) {
      state.policies.cookiePolicy = policies.cookiePolicy
      state.policies.usagePolicy = policies.usagePolicy
      state.policies.dataRetentionPolicy = policies.dataRetentionPolicy
      state.policies.termsAndConditons = policies.termsAndConditions
    },
    SET_LOADING_STATE(_, status) {
      this.state.resource_isLoading = status
    },
    SET_ACTIVE_USER(_, { accessToken, userName }) {
      this.state.access_token = accessToken
      this.state.username = userName
    },
    LOGOUT(_) {
      this.state.access_token = null
      this.state.active_user = {}
    },
  },
  modules: {
    cookbookStore,
    recipeStore,
    subscriptionStore,
    registerStore,
    contributorStore,
    searchStore,
    userStore,
    varietiesStore,
  },
})
