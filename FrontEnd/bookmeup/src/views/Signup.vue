<template>
  <v-container>
    <v-form class="form">
      <span id="logo">BookMeUp</span>
      <v-text-field
        dense
        outlined
        v-model.trim="$v.username.$model"
        :error-messages="usernameErrors"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        dense
        outlined
        v-model.trim="$v.email.$model"
        :error-messages="emailErrors"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        dense
        outlined
        v-model.trim="$v.password.$model"
        :error-messages="passwordErrors"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        dense
        outlined
        v-model.trim="$v.rePassword.$model"
        :error-messages="rePasswordErrors"
        label="Repeat Password"
        type="password"
        required
      ></v-text-field>
      <v-btn outlined :disabled="$v.$invalid" @click="sign">Sign Up</v-btn>
      <div class="signup_message">
        <span
          >Already have an account?
          <router-link to="/Login">Login</router-link>
        </span>
        now
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import {signup} from '../api/auth.api'

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      rePassword: "",
    };
  },
  computed: {
    usernameErrors: function() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("E-mail is required");
      !this.$v.username.minLength &&
        errors.push("Must contain at least 3 character");
      return errors;
    },
    emailErrors: function() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors: function() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Must contain at least 8 character");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    rePasswordErrors: function() {
      const errors = [];
      if (!this.$v.rePassword.$dirty) return errors;
      !this.$v.rePassword.required && errors.push("Password is required");
      !this.$v.rePassword.sameAsPassword &&
        errors.push("Passwords don't match");
      return errors;
    },
  },
  methods: {
    sign: function() {
     signup({
          username: this.username,
          email: this.email.toLowerCase(),
          password: this.password,
        })
        .then((res) => {
          if (res.data == "Email or Password Incorrect")
            this.$toasted.error(res.data);
          else {
            this.$router.push("/Login");
          }
        })
        .catch((err) => {
          console.log(err)
          this.$toasted.error("An error occured, try again");
        });
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    rePassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .form {
    display: grid;
    border: 1px solid;
    padding: 2em;
    border-color: darkgrey;
    width: 30%;
    margin: auto;
    margin-top: 10%;
    #logo {
      text-align: center;
      font-size: xx-large;
      font-weight: lighter;
      padding-bottom: 0.5em;
    }
    .signup_message {
      margin-top: 1.5em;
      padding-top: 1em;
      border-top: 1px solid;
      border-color: darkgrey;
      text-align: center;
    }
  }
}
@media screen and (max-width: 990px) {
  .form {
    display: grid;
    padding: 2em;
    margin: auto;
    margin-top: 20%;
    #logo {
      text-align: center;
      font-size: xx-large;
      font-weight: lighter;
      padding-bottom: 0.5em;
    }
    .signup_message {
      margin-top: 1.5em;
      padding-top: 1em;
      border-top: 1px solid;
      border-color: darkgrey;
      text-align: center;
    }
  }
}
</style>