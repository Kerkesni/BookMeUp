<template>
  <div>
    <navBar />
    <slot></slot>
  </div>
</template>

<script>
import navBar from "../components/NavBar";
import axios from "axios";

export default {
  components: {
    navBar,
  },
  methods: {
    loadLibrary: function() {
      axios
        .get(this.$endpoints.GETBOOKS + this.$store.getters.getUserId, {
          withCredentials: true,
        })
        .then((res) => {
          this.$store.commit("setLibrary", res.data);
        })
        .catch(() => {
          this.$toasted.error("Error while Loading Library");
        });
    },
    getTrackings: function() {
      axios
        .get(this.$endpoints.GETTRACKING + this.$store.getters.getUserId, {
          withCredentials: true,
        })
        .then((res) => {
          this.$store.commit("setTracking", res.data);
        })
        .catch((err) => this.$toasted.error(err));
    },
  },
  mounted() {
    if (this.$store.getters.getUserId) {
      this.loadLibrary();
      this.getTrackings();
    }
  },
};
</script>

<style></style>
