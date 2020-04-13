<template>
  <v-container>
    <div class="Search">
      <v-text-field
        dense
        label="Title or Author"
        outlined
        v-model="title"
        @keyup.enter="Search"
      ></v-text-field>
      <v-btn class="button" @click="Search">Search</v-btn>
    </div>
    <v-row class="Results">
      <v-col :class="{hide : selectedId}">
        <v-skeleton-loader
          type="article"
          class="loader"
          v-if="isLoading"
        ></v-skeleton-loader>
        <SearchResults :list="results" @select="Select" v-else />
      </v-col>
      <v-col v-if="selectedId" id="detail">
        <BookDetail :id="selectedId" @deselect="Deselect" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchResults from "../components/Search/SearchResults";
import BookDetail from "../components/Search/BookDetail";
import axios from "axios";

export default {
  components: {
    SearchResults,
    BookDetail
  },
  data() {
    return {
      results: [],
      selectedId: "",
      title: "",
      isLoading: false
    };
  },
  methods: {
    Search: function() {
      if (!this.title) return;
      this.isLoading = true;
      let formatted_title = this.title.replace(/ /g, "+");
      axios.get(this.$endpoints.SEARCH + formatted_title).then(res => {
        this.results = res.data;
      });
      this.isLoading = false;
    },
    Select: function(id) {
      this.selectedId = id;
    },
    Deselect: function() {
      this.selectedId = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 990px) {
  .Search {
    display: flex;
    width: 100%;
    margin: auto;
    align-items: top;
    .button {
      margin-left: 1em;
    }
  }
  .loader {
    margin: auto;
    width: 50%;
  }
  .hide{
    display: none;
  }
  .Results {
    #detail {
      position: absolute;
    }
  }
}
@media screen and (min-width: 1000px) {
  .Search {
    display: flex;
    width: 50%;
    margin: auto;
    align-items: top;
    .button {
      margin-left: 1em;
    }
  }
  .loader {
    margin: auto;
    width: 50%;
  }
}
</style>
