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
    <v-row>
      <v-col>
        <SearchResults :list="results" @select="Select"/>
      </v-col>
      <v-col v-if="selectedId">
        <BookDetail :id="selectedId" @deselect="Deselect"/>
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
      title: ""
    };
  },
  methods: {
    Search: function() {
      if (!this.title) return;

      let formatted_title = this.title.replace(/ /g, "+");
      axios.get(this.$endpoints.SEARCH + formatted_title).then(res => {
        this.results = res.data;
      });
    },
    Select: function(id) {
      this.selectedId = id;
    },
    Deselect: function(){
        this.selectedId = ""
    }
  }
};
</script>

<style lang="scss" scoped>
.Search {
  display: flex;
  width: 50%;
  margin: auto;
  align-items: top;
  .button {
    margin-left: 1em;
  }
}
</style>
