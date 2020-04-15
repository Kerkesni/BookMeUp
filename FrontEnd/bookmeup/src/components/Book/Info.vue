<template>
  <div>
    <v-skeleton-loader
      class="mx-auto"
      type="card, text@2"
      v-if="!data"
    ></v-skeleton-loader>
    <v-card outlined v-else>
      <div class="image_container">
        <img :src="data.thumbnail" alt="" />
      </div>
      <div class="title">
        {{ data.title }}
      </div>
      <div class="authors">by {{ data.authors }}</div>
      <v-btn color="error" @click="$emit('remove')">Remove from Library</v-btn>
    </v-card>
  </div>
</template>

<script>

export default {
  props: ["data"],
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 990px) {
}
@media screen and (min-width: 1000px) {
  .v-card {
    display: grid;
    text-align: -webkit-center;
    padding: 0.5em;
    .image_container {
      margin-bottom: 0.5em;
      img {
        height: 15em;
      }
    }
    .title {
      font-size: xx-large !important;
      margin-bottom: 0.5em;
    }
    .authors {
      font-size: larger;
      margin-bottom: 0.5em;
    }
  }
}
</style>
