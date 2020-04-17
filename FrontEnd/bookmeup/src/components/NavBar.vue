<template>
  <v-toolbar dense flat>
    <v-toolbar-title>
      BookMeUp
    </v-toolbar-title>
    <v-spacer> </v-spacer>
    <v-toolbar-items v-if="isLogged">
      <v-btn text to="/">
        Home
      </v-btn>
      <v-btn text to="/Search">
        Search
      </v-btn>
      <v-btn text to="/Library">
        Library
      </v-btn>
      <v-btn color="error" text @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn text to="/Login">
        Login
      </v-btn>
      <v-btn text to="/Signup">
        Sign UP
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isLogged: "getLoggedIn",
    }),
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logOut");
      this.$router.push("/Login");
    },
  },
};
</script>

<style></style>
