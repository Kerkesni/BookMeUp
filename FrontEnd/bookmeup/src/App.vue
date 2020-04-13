<template>
  <v-app>
    <v-content>
      <navBar/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navBar from "./components/NavBar";
import axios from 'axios'

export default {
  components: {
    navBar
  },
  methods: {
    loadLibrary : function(){
      axios.get(this.$endpoints.GETBOOKS+this.$store.getters.getUserId)
      .then(res =>{
        this.$store.commit('setLibrary', res.data)
      })
      .catch(()=>{
          this.$toasted.error("Error while Loading Library");
      })
    }
  },
  mounted() {
    this.loadLibrary()
  },
};
</script>
