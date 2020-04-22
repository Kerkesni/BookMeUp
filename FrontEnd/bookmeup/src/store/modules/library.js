import _ from 'lodash'

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
    }
}