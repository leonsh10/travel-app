<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="6" style="max-width: 360px">
        <img src="../../assets/logoNoBg.png" class="form-logo" alt="Logo" />

        <v-form ref="form" @submit.prevent="handleSubmit" class="mt-3">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            outlined
            dense
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            outlined
            dense
          ></v-text-field>

          <span class="anchor-style float-right mb-2" @click="forgotPassword">
            Forgot Password?
          </span>

          <v-btn
            type="submit"
            color="primary"
            class="login-btn"
            :disabled="!formValid"
          >
            Login
          </v-btn>

          <div class="justify-center mt-2 d-flex align-center text-subtitle-2">
            Don’t have an account?
            <span class="anchor-style ml-2 text-subtitle-2" @click="registerNow"
              >Register Now</span
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { required, email },
    password: { required },
  },
  computed: {
    formValid() {
      return this.email && this.password;
    },
    emailRules() {
      return [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Must be a valid email",
      ];
    },
    passwordRules() {
      return [(v) => !!v || "Password is required"];
    },
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("Form is valid, submitting...");
        try {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
          console.log("Login Successful!");
          this.$router.push({ path: "/" });
        } catch (error) {
            console.log('error',error)
          if (error.response && error.response.data) {
            if (error.response.data.message === "Invalid Credentials") {
              this.$toast.error("Your account does not exist.");
            } else if (error.response.data.message === "Invalid password") {
              this.$toast.error("Password is wrong.");
            } else {
              this.$toast.error("Login Failed. Please try again later.");
            }
          } else {
            this.$toast.error("Network error. Please try again later.");
          }
        }
      } else {
        console.log("Form is invalid, showing errors...");
      }
    },
    forgotPassword() {
      console.log("Forgot Password clicked");
    },
    registerNow() {
      console.log("Register Now clicked");
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style scoped>
/* Use the same styles as in the registration form */
.v-input--outlined.v-input--dense .v-input__control {
  min-height: 40px;
}

.v-input--outlined.v-input--dense .v-label {
  transform: translate(12px, 12px) scale(1);
}

.v-input--outlined.v-input--dense .v-input__slot {
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 0;
  box-shadow: none;
}

.v-input--outlined.v-input--dense.v-input--is-focused:not(.v-input--has-state)
  .v-input__slot {
  border-bottom: 2px solid #1976d2; /* Primary color */
}

.login-btn {
  width: 100%;
}
</style>
