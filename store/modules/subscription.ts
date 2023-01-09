import { makeRequest } from '~~/utils/makeRequest'

const state = () => ({
  success: false,
})
const mutations = {
  SET_CONTACT_FORM_ERRORS(_, errObj) {
    if (errObj.email !== undefined) {
      this.state.form_errors.contact_form.email = errObj.email
    }
  },
  RESET_CONTACT_FORM(state) {
    this.state.form_errors.contact_form = {}
    state.success = false
  },
  SHOW_SUCCESS_MESSAGE(state) {
    state.success = true
  },
}
const actions = {
  async subscribeUser(context, payload) {
    context.commit('SET_LOADING_STATE', true)
    context.commit('RESET_CONTACT_FORM')
    try {
      await makeRequest('subscriptions', {
        method: 'POST',
        data: {
          email: payload,
        },
      })
      context.commit('SHOW_SUCCESS_MESSAGE')
      context.commit('SET_LOADING_STATE', false)
    } catch (error) {
      context.commit('SHOW_SUCCESS_MESSAGE')
      context.commit('SET_LOADING_STATE', false)
    }
  },
  reset_contact_form(context) {
    context.commit('RESET_CONTACT_FORM')
  },
}

export default {
  mutations,
  actions,
  state,
}
