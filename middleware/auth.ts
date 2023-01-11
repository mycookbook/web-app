import { store } from '~~/store'
import { makeTokenValidationRequest } from '~~/utils/makeRequest'

export default defineNuxtRouteMiddleware(async (to) => {
  const accessToken = store.state.access_token
  //   return abortNavigation()
  if (!accessToken) {
    return navigateTo('/register')
  }
  try {
    const result = await makeTokenValidationRequest(accessToken)
    if (result.data.validated === true) {
      return navigateTo(to)
    }
  } catch (error) {
    store.dispatch('logout')
    return navigateTo('/register')
  }
  return navigateTo('/')
})
