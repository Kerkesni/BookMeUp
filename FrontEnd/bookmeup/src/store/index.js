import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const getTokenExpirationDate = (payload) => {
  const jwtData = JSON.parse(atob(payload))
  if (!jwtData.exp) {
    return null
  }

  const date = new Date(0)
  date.setUTCSeconds(jwtData.exp)

  return date
}
const isTokenExpired = (payload) => {
  const expirationDate = getTokenExpirationDate(payload)
  return expirationDate < new Date()
}

export default new Vuex.Store({
  state: {
    library: [],
    userId: '',
    username: '',
    loggedIn: false,
  },
  getters: {
    getLibrary: (state) => state.library,
    getUserId: state => state.userId,
    getUsername: state => state.username,
    getLogedIn: state => state.loggedIn
  },
  mutations: {
    setLibrary: (state, lib) => {
      state.library = lib
    },
    setUserId: (state, id) => {
      state.userId = id
    },
    setUsername: (state, name) => {
      state.username = name
    },
    addBook: (state, book) => {
      state.library.push(book)
      state.library = _.uniq(state.library)
    },
    removeBook: (state, id) => {
      _.remove(state.library, b => b.id === id)
    },
    setLoggedIn: (state, isLogged) => {
      state.loggedIn = isLogged
    }
  },
  actions: {
    bookExists: (context, id) => {
      let result = _.find(context.state.library, b => b.id === id)
      return result ? true : false
    },
    findBookById: (context, id) => {
      let result = _.find(context.state.library, b => b.id === id)
      return result
    },
    logOut: (context) => {
      Vue.$cookies.remove("jwtToken")
      context.commit("setUserId", '')
      context.setLoggedIn("setUserId", false)
    },
    updateUserData: (context, payload) => {
      payload = payload.split(".")[1];
      if (isTokenExpired(payload)) {
        context.commit("setLoggedIn", false)
      } else {
        context.commit("setLoggedIn", true)
        const jwtData = JSON.parse(atob(payload)).data
        context.commit('setUsername', jwtData.username)
        context.commit('setUserId', jwtData.id)
      }
    },
  },
})