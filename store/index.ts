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

export const store = createStore({
    state() {
        return {
            active_user: {},
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
                    makeRequest('definitions'),
                    makeRequest('cookbooks'),
                    makeRequest('policies'),
                ])

                context.commit('SET_LOADING_STATE', false)
                context.commit('STORE_DEFINITIONS', definitionData)
                context.commit('STORE_COOKBOOKS', cookbooksData.data)
                context.commit('STORE_POLICIES', policiesData.response)
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
        async set_active_user(context, payload) {
            const userDetails = await Promise.resolve(makeRequest('users/test-user'))

            if (userDetails.data) {
                context.commit('SET_ACTIVE_USER', {
                    accessToken: payload.code,
                    userName: payload.username,
                    active_user: userDetails.data.data.user[0]
                })

                const router = useRouter()
                router.replace({ path: '/' })
            }
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
            state.policies.cookiePolicy = policies.cookiePolicy.content
            state.policies.usagePolicy = policies.usagePolicy.content
            state.policies.dataRetentionPolicy = policies.dataRetentionPolicy.content
            state.policies.termsAndConditons = policies.termsAndConditions.content
        },
        SET_LOADING_STATE(state, status) {
            this.state.resource_isLoading = status
        },
        SET_ACTIVE_USER(state, { accessToken, userName, activeUser }) {
            console.log('au', activeUser)
            state.access_token = accessToken
            state.username = userName
            state.active_user = {
                recipes: activeUser.recipes
            }
        },
        LOGOUT(state) {
            state.access_token = null;
            state.active_user = {};
            state.following_data = {};
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
