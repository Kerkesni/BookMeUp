import {getTrackings} from "../../api/tracking.api"
import Vue from 'vue'
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
        },
        addPages: (state, data) => {
            state.tracking.dates.push(data)
        }
    },
    actions:{
        getTracking: function(context) {
            getTrackings(context.getters.getUserId)
              .then((res) => {
                context.commit("setTracking", res.data);
              })
              .catch((err) => Vue.prototype.$toasted.error(err));
          },
    }
}