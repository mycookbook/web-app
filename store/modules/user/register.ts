import { makeRequest } from '~~/utils/makeRequest'

const state = () => ({
  success: false,
})
const mutations = {
  SET_REGISTRATION_FORM_ERRORS(_, errObj) {
    if (errObj.name !== undefined) {
      this.state.form_errors.registration_form.fullName = errObj.name
    }
    if (errObj.email !== undefined) {
      this.state.form_errors.registration_form.email = errObj.email
    }
    if (errObj.password !== undefined) {
      this.state.form_errors.registration_form.password = errObj.password
    }
  },
  SHOW_SUCCESS_MESSAGE(state) {
    state.success = true
  },
  HIDE_SUCCESS_MESSAGE(state) {
    state.success = false
  },
  RESET_REGISTRATION_FORM(state) {
    this.state.form_errors.registration_form = {}
    state.success = false
  },
}
const actions = {
  async register(context, payload) {
    context.commit('SET_LOADING_STATE', true)
    context.commit('RESET_REGISTRATION_FORM')

    try {
      await makeRequest('auth/register', {
        method: 'POST',
        data: {
          name: payload.fullName,
          email: payload.email,
          password: payload.password,
        },
      })
      context.commit('SHOW_SUCCESS_MESSAGE')
      context.commit('SET_LOADING_STATE', false)
    } catch (error) {
      context.commit('HIDE_SUCCESS_MESSAGE')
      context.commit('SET_LOADING_STATE', false)
      context.commit('SET_REGISTRATION_FORM_ERRORS', error.response.data)
    }
  },
  reset_registration_form(context) {
    context.commit('RESET_REGISTRATION_FORM')
  },
}

export default {
  mutations,
  actions,
  state,
}
