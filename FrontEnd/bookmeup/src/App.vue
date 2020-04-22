<template>
  <v-app>
    <v-content :is="layout">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import {getBooks} from "./api/manage.api";
import {getTrackings} from "./api/tracking.api"

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
  methods: {
    loadLibrary: function() {
      getBooks(this.$store.getters.getUserId)
        .then((res) => {
          this.$store.commit("setLibrary", res.data);
        })
        .catch(() => {
          this.$toasted.error("Error while Loading Library");
        });
    },
    getTracking: function() {
      getTrackings(this.$store.getters.getUserId)
        .then((res) => {
          this.$store.commit("setTracking", res.data);
        })
        .catch((err) => this.$toasted.error(err));
    },
  },
  mounted() {
    if(this.$keycloak.authenticated){
      this.$store.commit('login')
      this.loadLibrary();
      this.getTracking();
    }
  },
};
</script>
