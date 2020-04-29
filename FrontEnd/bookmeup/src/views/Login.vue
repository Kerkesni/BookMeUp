<template>
  <v-container>
    <v-form class="form">
      <span id="logo">BookMeUp</span>
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
      <v-btn outlined :disabled="$v.$invalid" @click="login">Login</v-btn>
      <div class="signup_message">
        <span
          >You have no account?
          <router-link to="/Signup">Sign Up</router-link>
        </span>
        now
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import {login} from "../api/auth.api"

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
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
  },
  methods: {
    login: function() {
      login({
          email: this.email.toLowerCase(),
          password: this.password,
        })
        .then((res) => {
          if (res.data == "Email or Password Incorrect")
            this.$toasted.error(res.data);
          else {
            this.$cookies.set('jwtPayload', res.data);
            this.$store.dispatch("login", res.data);
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("/");
            }
          }
        })
        .catch(() => {
          this.$toasted.error("An error occured, try again");
        });
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
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