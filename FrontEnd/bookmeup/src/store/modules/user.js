import Vue from "vue"

export default {
    state:{
        username:'',
        userId:'',
        isLogged: false
    },
    getters:{
        getUsername: (state) => state.username,
        getUserId: (state) => state.userId,
        isLogged: (state) => state.isLogged
    },
    mutations:{
        login: (state) =>{
            if(!Vue.prototype.$keycloak.authenticated)
                return
            state.username = Vue.prototype.$keycloak.userName
            state.userId = Vue.prototype.$keycloak.subject
            state.isLogged = true
        },
        logout: (state) => {
            Vue.prototype.$keycloak.logoutFn()
            .then(()=>{
                state.username = ""
                state.userId = ""
                state.isLogged = false
            })
            .catch((err)=>console.log(err))
        }
    }
}