import { makeRequest } from '~~/utils/makeRequest'

const state = () => ({
    recipe: {},
    totalCount: 0,
    hasClapped: 0,
    maxAllowedClaps: 10,
})
const mutations = {
    INCREMENT_CLAP(state, claps) {
        state.totalCount = claps
        state.hasClapped += 1
    },
    UPDATE_RECIPE_STATE(state, newState) {
        this.state.recipe = newState
        state.hasClapped += 1
    },
    RESET_HASCLAPPED(state) {
        state.hasClapped = 0
    },
}
const actions = {
    async add_clap(context, payload) {
        try {
            const response = await makeRequest('add-clap', {
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
    async fetch_recipe(context, recipeId) {
        context.commit('SET_LOADING_STATE', true)
        try {
            const response = await makeRequest(`recipes/${recipeId}`)
            response.data.ingredients = JSON.parse(response.data.data.ingredients)
            const parsedData = JSON.parse(response.data.data.nutritional_detail)
            const detail = {
                cal: parsedData.cal,
                carbs: parsedData.carbs,
                protein: parsedData.protein,
                fat: parsedData.fat,
            }
            response.data.nutritional_detail = detail

            context.commit('UPDATE_RECIPE_STATE', response.data)
            context.commit('SET_LOADING_STATE', false)
        } catch (error) {
            alert(
                'We are having trouble loading this recipe. Please refresh or try again later.'
            )
            console.error('fetch error', error)
            context.commit('SET_LOADING_STATE', false)
        }
    },
    reset_hasClapped(context) {
        context.commit('RESET_HASCLAPPED')
    },
}

export default {
    mutations,
    actions,
    state,
}
