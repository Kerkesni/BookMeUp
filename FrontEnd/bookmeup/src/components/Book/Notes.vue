<template>
  <div>
    <v-card v-if="!add && !show">
      <div class="notes" v-if="notes.length > 0">
        <v-row>
          <v-col v-for="(note, index) in notes" :key="index" cols="12" lg="3" md="12" sm="12">
            <v-card class="note" @click="select(note._id)">
              <span id="timestamp">{{ getTime(note.timestamp) }}</span>
              <span id="title">{{ note.title }}</span>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="add">
        <div id="text" v-if="notes.length < 1">No Notes Stored</div>
        <v-btn color="primary" @click="noteAdd(true)">Add Note</v-btn>
      </div>
    </v-card>
    <addNote v-if="!show && add" @close="noteAdd(false)" @addded="updateNotes" />
    <show
      :data="selected"
      v-if="show && !add"
      @close="unselect"
      @remove="modal = true"
    />
    <v-row justify="center">
      <v-dialog v-model="modal" max-width="290">
        <v-card>
          <v-card-title class="headline">Warning</v-card-title>
          <v-card-text
            >This action is not reversable, would you like to continue
            anyway?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="modal = false">Keep</v-btn>
            <v-btn color="red darken-1" text @click="removeNote">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import addNote from "./addNote";
import show from "./show";

import moment from "moment";
import axios from "axios";

export default {
  components: {
    addNote,
    show,
  },
  data() {
    return {
      id: "",
      notes: [],
      add: false,
      show: false,
      selectedId: "",
      modal: false,
    };
  },
  computed: {
    selected: function() {
      return this.notes.find((note) => note._id === this.selectedId);
    },
  },
  methods: {
    getNotes: function() {
      axios
        .get(
          this.$endpoints.GETNOTES +
            this.$store.getters.getUserId +
            "/" +
            this.id,
          { withCredentials: true }
        )
        .then((res) => (this.notes = res.data))
        .catch(() => this.$toasted.error("Error While Getting Notes"));
    },
    updateNotes: function() {
      this.add = false;
      this.getNotes();
    },
    removeNote: function() {
      axios
        .delete(
          this.$endpoints.DELNOTE +
            this.$store.getters.getUserId +
            "/" +
            this.id +
            "/" +
            this.selectedId,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          this.modal = false;
          this.unselect();
          this.updateNotes();
        })
        .catch(() => this.$toasted.error("An error occured try again"));
    },
    getTime: function(timestamp) {
      return moment(timestamp).format("Do MMM YY");
    },
    select: function(id) {
      this.show = true;
      this.selectedId = id;
      this.$emit("addNote", true);
    },
    unselect: function() {
      this.selectedId = "";
      this.show = false;
      this.$emit("addNote", false);

    },
    noteAdd: function(add) {
      this.$emit("addNote", add);
      this.add = add;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getNotes();
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .add {
    padding: 1em;
    text-align: center;
    #text {
      font-weight: lighter;
      font-size: x-large;
      padding-bottom: 0.5em;
    }
    .v-btn {
      width: 9em;
    }
  }
  .notes {
    padding: 1.5em;
    .note {
      display: grid;
      padding: 0.5em;
      #title {
        font-size: x-large;
      }
      #timestamp {
        font-size: small;
      }
    }
  }
}
@media screen and (max-width: 990px) {
  .add {
    padding: 1em;
    text-align: center;
    #text {
      font-weight: lighter;
      font-size: x-large;
      padding-bottom: 0.5em;
    }
    .v-btn {
      width: 9em;
    }
  }
  .notes {
    padding: 1em;
    .note {
      display: grid;
      padding: 0.5em;
      #title {
        font-size: x-large;
      }
      #timestamp {
        font-size: small;
      }
    }
  }
}
</style>
