<template>
  <div>
    <v-toolbar dense flat>
      <v-toolbar-title>
        BookMeUp
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <div class="full">
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
      </div>
      <div class="mobile">
        <v-btn icon @click="menu = !menu">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <transition name="slide-fade">
      <v-list v-if="menu && isLogged" class="mobile_menu">
        <v-list-item>
          <v-list-item-title
            ><v-btn text to="/" @click="menu = false">
              Home
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            ><v-btn text to="/Search" @click="menu = false">
              Search
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            ><v-btn text to="/Library" @click="menu = false">
              Library
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn color="error" text @click="logout">
              Logout
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-if="menu && !isLogged" class="mobile_menu">
        <v-list-item>
          <v-list-item-title
            ><v-btn text to="/Login">
              Login
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            ><v-btn text to="/Sign Up">
              Sign Up
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: false,
    };
  },
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

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .full {
    display: flex;
  }
  .mobile {
    display: none;
  }
  .mobile_menu {
    display: none;
  }
}
@media screen and (max-width: 990px) {
  .full {
    display: none;
  }
  .mobile {
    display: flex;
  }
  .mobile_menu {
    text-align: center;
    .v-btn {
      border-bottom: 1px solid darkgrey;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.1s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.1s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
}
</style>
