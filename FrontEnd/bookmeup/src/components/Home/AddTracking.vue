<template>
  <v-card>
    <v-form>
      <v-select
        :items="books"
        label="Book To Track"
        v-model="$v.select_value.$model"
        @change="setTotalPages"
        :error-messages="selectErrors"
        outlined
        required
      ></v-select>
      <v-text-field
        outlined
        label="Total Book Pages (Readable)"
        v-model.trim="$v.total_pages.$model"
        :error-messages="totalErrors"
        required
      >
      </v-text-field>
      <v-text-field
        outlined
        label="Starting Page"
        v-model.trim="$v.start_page.$model"
        :error-messages="startErrors"
        required
      >
      </v-text-field>
      <v-menu
        ref="f_menu"
        v-model="f_menu"
        :close-on-content-click="false"
        :return-value.sync="finish_date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="finish_date"
            label="Finish Date"
            readonly
            outlined
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="finish_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="$refs.f_menu.save(finish_date)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>
      <v-btn large outlined @click="$emit('close')">
        Cancel
      </v-btn>
      <v-btn large outlined :disabled="$v.$invalid" @click="add">
        Track Book
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { required, integer, minValue } from "vuelidate/lib/validators";
import moment from "moment";
import axios from "axios";

export default {
  props: ["lib"],
  data() {
    return {
      select_value: "",
      total_pages: 0,
      start_page: 0,
      finish_date: "",
      f_menu: false,
    };
  },
  computed: {
    books: function() {
      return this.lib.map((book) => book.title);
    },
    selectErrors: function() {
      const errors = [];
      if (!this.$v.select_value.$dirty) return errors;
      !this.$v.select_value.required && errors.push("Required");
      return errors;
    },
    totalErrors: function() {
      const errors = [];
      if (!this.$v.total_pages.$dirty) return errors;
      !this.$v.total_pages.required && errors.push("Required");
      !this.$v.total_pages.integer && errors.push("Must be an integer");
      !this.$v.total_pages.minValue && errors.push("Must be above 0");
      return errors;
    },
    startErrors: function() {
      const errors = [];
      if (!this.$v.start_page.$dirty) return errors;
      !this.$v.start_page.required && errors.push("Required");
      !this.$v.start_page.integer && errors.push("Must be an integer");
      !this.$v.start_page.minValue && errors.push("Must be above 0");
      return errors;
    },
  },
  methods: {
    setTotalPages: function() {
      this.total_pages = this.lib.find(
        (b) => b.title === this.select_value
      ).total_pages;
    },
    add: function() {
      let tracking = {
        UID: this.$store.getters.getUserId,
        BID: this.lib.find((b) => b.title === this.select_value).id,
        current_page: this.start_page,
        total_pages: this.total_pages,
        finish_date: moment(this.finish_date).unix(),
        last_read: moment().unix(),
      };
      axios
        .post(this.$endpoints.ADDTRACKING, tracking, { withCredentials: true })
        .then(() => {
          tracking.add_date = tracking.last_read;
          this.$store.commit("setTracking", tracking);
          this.$toasted.success("Tracking Added");
          this.$emit("close");
        })
        .catch((err) => this.$toasted.error(err));
    },
  },
  validations: {
    select_value: {
      required,
    },
    total_pages: {
      required,
      integer,
      minValue: minValue(0),
    },
    start_page: {
      required,
      integer,
      minValue: minValue(0),
    },
    finish_date: {
      required,
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .v-card {
    padding: 3em;
    width: 35vw;
    margin: auto;
    .v-form {
      .v-btn {
        margin: 0.5em;
      }
    }
  }
  .v-picker {
    width: auto;
    height: auto;
  }
}
@media screen and (max-width: 990px) {
  .v-card {
    padding: 1em;
    width: 100vw;
    margin: auto;
    .v-form {
      .v-btn {
        margin: 0.5em;
      }
    }
  }
  .v-picker {
    width: auto;
    height: auto;
  }
}
</style>
