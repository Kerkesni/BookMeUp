<template>
  <v-app>
    <v-content :is="layout">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
  methods: {
    getJWTPayload() {
      const payload = this.$cookies.get("jwtPayload");
      return payload;
    },
  },
  created() {
    const payload = this.getJWTPayload();
    if (payload) this.$store.dispatch("updateUserData", payload);
  },
};
</script>
