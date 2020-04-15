<template>
  <v-row :class="{ selected: selected }">
    <v-col v-for="(item, index) in list" :key="index" cols="12">
      <v-card outlined @click="$emit('select', item.id)">
        <span class="image_area">
          <img id="image" :src="item.thumbnail" />
        </span>
        <span id="data">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ formatAuthors(item.authors) }}</v-card-subtitle>
        </span>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["list", "selected"],
  methods: {
    formatAuthors: function(authors) {
      let tmp = "";
      for (var author in authors) {
        tmp += authors[author] + " & ";
      }
      tmp = tmp.substring(0, tmp.length - 2);
      return tmp;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .row {
    display: block;
    width: 40%;
    margin: auto;

    &.selected {
      width: 70%;
    }

    .v-card {
      display: flex;
      .image_area {
        padding: 0.2rem;
        height: 204px;
        #image {
          height: 100%;
        }
      }
      .data {
        overflow: auto;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .v-card {
    padding: 0.1em;
    display: flex;
    margin-bottom: 1em;
    .image_area {
      padding: 0.1rem;
    }
    .data {
      width: 70%;
      overflow: auto;
    }
  }
}
</style>
