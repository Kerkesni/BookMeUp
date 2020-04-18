<template>
  <v-card class="container">
    <div class="data">
      <span id="time">{{ getTime(data.timestamp) }}</span>
      <span id="title">{{ data.title }}</span>
      <div class="ql-container ql-snow">
        <div class="ql-editor" v-html="data.content"></div>
      </div>
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
    padding: 2em;
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
      .ql-container.ql-snow {
        border: none;
      }
    }
  }
}
@media screen and (max-width: 990px) {
  .container {
    padding: 0.7em;
    .buttons {
      text-align: center;
      margin-top: 2em;
      .v-btn {
        margin: 0.5em;
        width: 7em;
      }
    }
    .data {
      display: grid;
      #title {
        font-size: xx-large;
      }
      #time {
        font-size: small;
        margin-bottom: -0.5em;
      }
      .ql-container.ql-snow {
        border: none;
      }
    }
  }
}
</style>
