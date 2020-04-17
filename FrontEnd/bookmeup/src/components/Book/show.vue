<template>
  <v-card class="container">
    <div class="data">
      <span id="time">{{ getTime(data.timestamp) }}</span>
      <span id="title">{{ data.title }}</span>
      <div id="content" v-html="data.content"></div>
    </div>
    <div class="buttons">
      <v-btn large @click="$emit('close')">Back</v-btn>
      <v-btn color="error" large @click="$emit('remove')">Delete</v-btn>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: ["data"],
  methods: {
    getTime: function(timestamp) {
      return moment(timestamp).format("Do MMM YY");
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .container {
    padding: 1em;
    .buttons {
      text-align: center;
      margin-top: 2em;
      .v-btn {
        margin: 0.5em;
        width: 9em;
      }
    }
    .data {
      display: grid;
      #title {
        font-size: xxx-large;
      }
      #time {
        font-size: small;
        margin-bottom: -0.5em;
      }
    }
  }
}
</style>
