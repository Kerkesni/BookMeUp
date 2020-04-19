<template>
  <v-container>
    <v-row v-if="library.length > 0">
      <v-col
        v-for="(book, index) in library"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <BookCard :data="book" />
      </v-col>
    </v-row>
    <div v-else class="no_book">
      <div>No Books Added Yet</div>
      <div>
        Add One Now
        <router-link to="/Search">Now</router-link>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import BookCard from "../components/Library/BookCard";

export default {
  components: {
    BookCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      library: "getLibrary",
    }),
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .container {
    margin-top: 2em;
    .v-row {
      display: block;
    }
  }
}
@media screen and (max-width: 990px) {
  .container {
    margin-top: 1em;
    .v-row {
      display: block;
    }
  }
}
.no_book {
  text-align: center;
  font-size: x-large;
  font-weight: lighter;
}
</style>
