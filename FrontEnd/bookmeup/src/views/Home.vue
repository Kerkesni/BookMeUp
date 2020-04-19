<template>
  <div class="home">
    <v-container>
      <div class="welcome">Welcome, {{ this.$store.getters.getUsername }}</div>
      <div class="add" v-if="Object.keys(tracking).length === 0">
        <transition name="fade">
          <AddTracking :lib="lib" v-if="add" @close="add = false" />
        </transition>
        <transition name="sfade">
          <div class="add_button" v-if="!add">
            <v-btn fab @click="add = true">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
            <div>START TRACKNG</div>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div class="display_tracking" v-if="Object.keys(tracking).length > 0">
          <DisplayTracking :title="getTitle()" :data="tracking" />
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddTracking from "../components/Home/AddTracking";
import DisplayTracking from "../components/Home/DisplayTracking";

export default {
  components: {
    AddTracking,
    DisplayTracking,
  },
  data() {
    return {
      add: false,
    };
  },
  computed: {
    ...mapGetters({
      tracking: "getTracking",
      lib: "getLibrary"
    }),
  },
  methods: {
    getTitle: function() {
      if (!this.lib) return "";
      let book = this.lib.find((b) => b.id === this.tracking.BID);
      return book ? book.title : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .welcome {
    margin-top: 2em;
    text-align: center;
    font-weight: lighter;
    font-size: xxx-large;
  }
  .add {
    margin-top: 2em;
    text-align: center;
    .add_button {
      margin-top: 8%;
      display: block;
      font-size: large;
      color: rgba(0, 0, 0, 0.54);
      font-weight: 500;
      line-height: 3.5em;
      letter-spacing: 0.125em;
    }
  }
}
@media screen and (max-width: 990px) {
  .welcome {
    margin-top: 0.5em;
    text-align: center;
    font-weight: lighter;
    font-size: xxx-large;
  }
  .add {
    margin-top: 2em;
    text-align: center;
    .add_button {
      margin-top: 20%;
      display: block;
      font-size: large;
      color: rgba(0, 0, 0, 0.54);
      font-weight: 500;
      line-height: 3.5em;
      letter-spacing: 0.125em;
    }
  }
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.sfade-enter-active {
  transition: opacity 3.5s;
}
.sfade-enter,
.sfade-leave-active {
  opacity: 0;
}
</style>
