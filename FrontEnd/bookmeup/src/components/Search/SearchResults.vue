<template>
  <div class="container">
    <v-card
      outlined
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('select', item.id)"
    >
      <span id="image">
        <img :src="item.thumbnail" style="margin:auto" />
      </span>
      <span id="info">
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-subtitle>{{ formatAuthors(item.authors) }}</v-card-subtitle>
      </span>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    formatAuthors: function(authors) {
      let tmp = "";
      for (var author in authors) {
        tmp += authors[author] + " & ";
      }
      tmp = tmp.substring(0, tmp.length - 2);
      return tmp;
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .container {
    width: 90%;
    .v-card {
      display: inline-flex;
      width: 100%;
      margin-bottom: 1em;
      #image {
        padding: 0.3em;
      }
    }
  }
}
@media screen and (min-width: 1000px) {
  .container {
    width: 50%;
    .v-card {
      display: flex;
      margin-bottom: 1em;
      #image {
        padding: 1em;
      }
    }
  }
}
</style>
