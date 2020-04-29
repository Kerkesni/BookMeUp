import _ from 'lodash'
import {getBooks} from "../../api/manage.api";
import Vue from 'vue'

export default {
    state:{
        library: []
    },
    getters:{
        getLibrary: (state) => state.library,
    },
    mutations:{
        setLibrary(state, lib) {
            state.library = lib
          },
        addBook(state, book) {
            state.library.push(book)
            state.library = _.uniq(state.library)
        },
        removeBook(state, id){
            _.remove(state.library, b => b.id === id)
        },
        emptyLibrary(state){
            state.library = {}
        }
    },
    actions:{
        bookExists: (context, id) => {
            let result = _.find(context.state.library, b => b.id === id)
            return result ? true : false
        },
        findBookById: (context, id) => {
            let result = _.find(context.state.library, b => b.id === id)
            return result
        },
        loadLibrary: function(context) {
            getBooks(context.getters.getUserId)
              .then((res) => {
                context.commit("setLibrary", res.data);
              })
              .catch(() => {
                Vue.prototype.$toasted.error("Error while Loading Library");
              });
          },
    }
}