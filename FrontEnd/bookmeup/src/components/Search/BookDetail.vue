<template>
  <div v-sticky class="container">
    <v-card v-if="data" class="detail">
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
    </v-card>
    <v-btn color="primary" @click="addToLibrary" v-if="!exists"
      >Add To Library</v-btn
    >
    <v-btn color="error" @click="removeFromLibrary" v-else
      >Remove From Library</v-btn
    >
    <v-btn @click="$emit('deselect')">Close</v-btn>
  </div>
</template>

<script>
import _ from "lodash";
import {getBookDetails} from '../../api/search.api'
import {addBook, delBook} from '../../api/manage.api'

export default {
  props: ["id"],
  data() {
    return {
      data: {},
      exists: false,
    };
  },
  watch: {
    id: function() {
      this.fetchData();
    },
  },
  methods: {
    fetchData: function() {
      getBookDetails(this.id)
        .then((res) => {
          this.data = res.data;
          this.$store
            .dispatch("bookExists", this.id)
            .then((res) => (this.exists = res));
        });
    },
    formatAuthors: function(authors) {
      let tmp = "";
      for (var author in authors) {
        tmp += authors[author] + " & ";
      }
      tmp = tmp.substring(0, tmp.length - 2);
      return tmp;
    },
    addToLibrary: function() {
      addBook({
            userId: this.$store.getters.getUserId,
            book: {
              _id: this.id,
              title: this.data.title,
              authors: this.formatAuthors(this.data.authors),
              thumbnail: this.data.thumbnail,
              total_pages: this.data.total_pages
            }
      })
        .then(() => {
          let book = _.cloneDeep(this.data);
          book.id = this.id;
          book.authors = this.formatAuthors(this.data.authors);
          book.current_page = 0
          this.$store.commit("addBook", book);
          this.exists = true;
          this.$toasted.success("Book Added");
        })
        .catch(() => {
          this.$toasted.error("An Error Occured");
        });
    },
    removeFromLibrary: function() {
      let userId = this.$store.getters.getUserId;
      delBook(userId, this.id)
        .then(() => {
          this.$store.commit("removeBook", this.id);
          this.exists = false;
          this.$toasted.success("Book removed");
        })
        .catch(() => {
          this.$toasted.error("Error while removing the book");
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .container {
    display: grid;
    .detail {
      display: grid;
      padding: 0.5em;
      max-height: 80vh;
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
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
    }
  }
}
@media screen and (max-width: 990px) {
  .container {
    display: grid;
    .detail {
      display: grid;
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
  }
}
</style>
