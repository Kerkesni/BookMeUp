<template>
  <v-card outlined v-sticky v-if="data" class="detail">
    <span id="title">{{ data.title }}</span>
    <span id="authors">by {{ formatAuthors(data.authors) }}</span>
    <span id="description"
      ><b>Description: </b>
      <p v-html="data.description"></p
    ></span>
    <span id="categories"
      ><b>categories: </b>{{ formatAuthors(data.categories) || "none" }}</span
    >
    <span id="pages"><b>Number of Pages:</b> {{ data.pageCount }}</span>
    <span id="publisher"><b>Publisher: </b>{{ data.publisher }}</span>
    <span id="publishData"
      ><b>Published Date: </b>{{ data.publishedDate }}</span
    >
    <v-btn @click="$emit('deselect')">Close</v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      data: {}
    };
  },
  watch: {
    id: function() {
      this.fetchData();
    }
  },
  methods: {
    fetchData: function() {
      axios.get(this.$endpoints.DETAILS + this.id).then(res => {
        this.data = res.data;
      });
    },
    formatAuthors: function(authors) {
      let tmp = "";
      for (var author in authors) {
        tmp += authors[author] + " & ";
      }
      tmp = tmp.substring(0, tmp.length - 2);
      return tmp;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.detail {
  display: grid;
  overflow: auto;
  #title {
    text-align: -webkit-center;
    font-size: xx-large;
  }
  #authors {
    text-align: -webkit-center;
    font-size: larger;
  }
  #description {
    text-align: justify;
    font-size: medium;
  }
  * {
    padding: 0.5em;
  }
}
</style>
