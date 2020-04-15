<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <Info :data="data" @remove="dialog = true" />
      </v-col>
      <v-col cols="10"></v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Warning</v-card-title>
          <v-card-text>All the data related to this book will be destroyed, this action is not reversible</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="dialog = false"
              >Keep</v-btn
            >
            <v-btn color="red darken-1" text @click="removeBook">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Info from "../components/Book/Info";
import axios from "axios";

export default {
  components: {
    Info,
  },
  data() {
    return {
      data: {},
      dialog: false,
    };
  },
  methods: {
    getData: function() {
      this.$store
        .dispatch("findBookById", this.$route.params.id)
        .then((res) => {
          this.data = res;
        });
    },
    removeBook: function() {
      this.dialog = false;
      let userId = this.$store.getters.getUserId;
      axios
        .delete(this.$endpoints.DELBOOK + userId + "/" + this.data.id)
        .then(() => {
          this.$store.commit("removeBook", this.data.id);
          this.exists = false;
          this.$toasted.success("Book removed");
          this.$router.push("/Library");
        })
        .catch(() => {
          this.$toasted.error("Error while removing the book");
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2em;
}
</style>
