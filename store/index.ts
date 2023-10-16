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
            smart_redirects: {},
            following_data: {},
            upload_error: null,
            imagePath: ""

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
            const userDetails = await Promise.resolve(makeRequest('users/' + payload._d))

            if (userDetails.data) {
                context.commit('SET_ACTIVE_USER', {
                    accessToken: payload.code,
                    userName: payload._d,
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
        reset_msgs(context: { commit: (arg0: string, arg1: boolean | undefined) => void; }) {
            context.commit('SET_LOADING_STATE', false)
            context.commit('RESET_MSGS', false)
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
            state.resource_isLoading = status
        },
        SET_ACTIVE_USER(state, { accessToken, userName, activeUser }) {
            state.access_token = accessToken
            state.username = userName
            state.active_user = {
                recipes: []
            }
            localStorage.setItem('_t', accessToken)
        },
        LOGOUT(state) {
            state.active_user = {}
            state.resource_isLoading = false
            state.policies.cookiePolicy = ''
            state.policies.usagePolicy = ''
            state.policies.dataRetentionPolicy = ''
            state.policies.termsAndConditons = ''
            state.form_errors.registration_form = {}
            state.form_errors.contact_form = {}
            state.access_token = null;
            state.contributor = {}
            state.username = null
            state.following_data = {};
            state.smart_redirects = {}
        },
        UPDATE_CONTRIBUTOR_OBJECT(state, newState) {
            state.contributor = newState.data.user[0]
        },
        RESET_MSGS(state) {
            state.upload_error = null
            state.imagePath = ''
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
