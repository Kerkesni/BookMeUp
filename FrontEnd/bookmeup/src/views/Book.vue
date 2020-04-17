<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <Info @remove="dialog = true" />
      </v-col>
      <v-col cols="10">
        <Notes/>
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
import axios from "axios";

export default {
  components: {
    Info,
    Notes,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    removeBook: function() {
      this.dialog = false;
      let userId = this.$store.getters.getUserId;
      let bookId = this.$route.params.id
      axios
        .delete(this.$endpoints.DELBOOK + userId + "/" + bookId, {
          withCredentials: true,
        })
        .then(() => {
          this.$store.commit("removeBook", bookId);
          this.$toasted.success("Book removed");
          this.$router.push("/Library");
        })
        .catch((err) => {
          console.log(err)
          this.$toasted.error("Error while removing the book");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2em;
}
</style>
