import Vue from "vue"

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

export default {
    state:{
        userId: '',
        username: '',
        isLogged: false
    },
    getters:{
        getUserId: state => state.userId,
        getUsername: state => state.username,
        isLogged: (state) => state.isLogged
    },
    mutations:{
      setUserId: (state, value) => state.userId = value,
      setUsername: (state, value) => state.username = value,
      setIsLogged: (state, value) => state.isLogged = value
    },actions:{
      login: (state, payload) =>{
        if (isTokenExpired(payload)) {
          state.commit('setIsLogged', false)
        } else {
          const jwtData = JSON.parse(atob(payload)).data
          state.commit('setIsLogged', true)
          state.commit('setUsername', jwtData.username)
          state.commit('setUserId', jwtData.id)
          state.dispatch("loadLibrary")
          state.dispatch("getTracking")
        }
    },
    logout: (state) => {
        Vue.$cookies.remove("jwtPayload")
        state.username = ''
        state.userId = ''
        state.commit('emptyLibrary')
        state.commit('removeTracking')
    }
    }
}