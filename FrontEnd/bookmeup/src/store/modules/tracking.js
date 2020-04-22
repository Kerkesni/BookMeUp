
export default {
    state:{
        tracking: {},
    },
    getters:{
        getTracking: state => state.tracking,
    },
    mutations:{
        setTracking: (state, tracking) => {
            state.tracking = tracking
          },
        removeTracking: (state) =>{
            state.tracking = {}
        }
    },
    actions:{
    }
}