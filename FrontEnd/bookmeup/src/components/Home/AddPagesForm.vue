<template>
  <form>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="$v.date.$model"
          label="Date"
          readonly
          outlined
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
      </v-date-picker>
    </v-menu>
    <v-text-field
      outlined
      label="Pages Read"
      v-model.trim="$v.pages.$model"
      :error-messages="pagesErrors"
      required
    >
    </v-text-field>
    <v-btn text @click="$emit('close')">Cancel</v-btn>
    <v-btn text @click="add" :disabled="$v.$invalid">Add</v-btn>
  </form>
</template>

<script>
import {
  required,
  integer,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";
import moment from "moment";
import axios from "axios";

const lessThanDate = (finish) => (value) =>
  moment.unix(finish).diff(moment(value), "days") >= 0;

const notExist = (dates) => (value) =>
  !dates.find((x) => x.date === moment(value).unix());

export default {
  props: ["BID", "data", "r_pages"],
  data() {
    return {
      pages: 0,
      date: "",
      menu: false,
    };
  },
  computed: {
    pagesErrors: function() {
      const errors = [];
      if (!this.$v.pages.$dirty) return errors;
      !this.$v.pages.required && errors.push("Required");
      !this.$v.pages.integer && errors.push("Has to be an integer");
      !this.$v.pages.minValue && errors.push("one page minimum is required");
      !this.$v.pages.maxValue && errors.push("Invalid Value");
      return errors;
    },
  },
  methods: {
    add: function() {
      let data = {
        UID: this.$store.getters.getUserId,
        BID: this.BID,
        date: moment(this.date).unix(),
        pages: parseInt(this.pages),
      };
      axios
        .post(this.$endpoints.ADDPAGES, data, { withCredentials: true })
        .then(() => {
          this.$store.commit("addPages", data);
          this.$toasted.success("Pages Successfully Added");
          this.$emit("close");
        })
        .catch(() => this.$toasted.error("An Error Occured Try Again"));
    },
  },
  validations() {
    return {
      pages: {
        required,
        integer,
        minValue: minValue(1),
        maxValue: maxValue(this.r_pages),
      },
      date: {
        required,
        lessThanDate: lessThanDate(this.data.finish_date),
        notExist: notExist(this.data.dates),
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  form {
    padding: 1rem;
    text-align: center;
  }
}
@media screen and (max-width: 990px) {
  form {
    padding: 1rem;
    text-align: center;
  }
}
</style>
