import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    library: [],
    userId: '123'
  },
  getters: {
    getLibrary: (state) => state.library,
    getUserId: state => state.userId
  },
  mutations: {
    setLibrary: (state, lib) => {
      state.library = lib
    },
    setUserId: (state, id) => {
      state.userId = id
    },
    addBook: (state, book) => {
      state.library.push(book)
      state.library = _.uniq(state.library)
    },
    removeBook: (state, id) => {
      _.remove(state.library, b => b.id === id)
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
    }
  },
})