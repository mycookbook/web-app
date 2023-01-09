import createPersistedState from 'vuex-persistedstate'
import { store } from '~~/store'

export default defineNuxtPlugin((_) => {
  createPersistedState()(store)
})
