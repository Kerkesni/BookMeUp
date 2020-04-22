<template>
  <v-container>
    <v-row>
      <v-col md="2" sm="12">
        <Info @remove="dialog = true" :class="{disable: info}" />
      </v-col>
      <v-col md="10" sm="12">
        <Notes @addNote="showinfo" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Warning</v-card-title>
          <v-card-text
            >All the data related to this book will be destroyed, this action is
            not reversible</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="dialog = false">Keep</v-btn>
            <v-btn color="red darken-1" text @click="removeBook">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Info from "../components/Book/Info";
import Notes from "../components/Book/Notes";
import {delBook} from "../api/manage.api";

export default {
  components: {
    Info,
    Notes,
  },
  data() {
    return {
      dialog: false,
      info: false,
    };
  },
  methods: {
    removeBook: function() {
      this.dialog = false;
      let userId = this.$store.getters.getUserId;
      let bookId = this.$route.params.id;
      delBook(userId,bookId)
        .then(() => {
          this.$store.commit("removeBook", bookId);
          this.$toasted.success("Book removed");
          this.$router.push("/Library");
        })
        .catch((err) => {
          console.log(err);
          this.$toasted.error("Error while removing the book");
        });
    },
    showinfo: function(show) {
      this.info = show;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .container {
    margin-top: 2em;
  }
}
@media screen and (max-width: 990px) {
  .container {
    margin-top: 0.5em;
    .row {
      display: block;
      .disable{
        display: none;
      }
    }
  }
}
</style>
