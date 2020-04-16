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
  },
  mounted() {
    if (this.$store.getters.getUserId) this.loadLibrary();
  },
};
</script>

<style></style>
