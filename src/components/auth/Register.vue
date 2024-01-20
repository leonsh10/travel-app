<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="6">
        <img src="../../assets/logo23.png" class="form-logo" alt="Logo">
        <v-card class="mx-auto fill-height no-shadow" max-width="344">
          <v-card-title class="justify-center text-subtitle-1" style="color: #667c99;">Create your account</v-card-title>
          <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="First name"
                outlined
                dense
                class="mb-3"
              ></v-text-field>

              <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Last name"
              outlined
              dense
              class="mb-3"
            ></v-text-field>

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

              <v-checkbox
                v-model="terms"
                :rules="termsRules"
                class="mt-0"
                label="I agree to site terms and conditions"
              ></v-checkbox>

              <v-btn type="submit" color="success" class="w-100" :disabled="!valid">
                Register
              </v-btn>
            </v-form>

            <div class="d-flex align-center justify-center mt-3 text-subtitle-2">
              Already have an account?
              <span @click="loginNow" class="anchor-style ml-2 text-subtitle-2">Sign In</span>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  
  data() {
    return {
      valid: false,
      name: "",
      lastname: "",
      email: "",
      password: "",
      terms: false,
    };
  },
  computed: {
    nameRules() {
      return [(v) => !!v || "Field is required"];
    },
    emailRules() {
      return [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
      ];
    },
    termsRules() {
      return [
        v => !!v || "You must agree to the terms and conditions"
      ];
    },
  },
  methods: {
    loginNow() {
      this.$router.push({ name: 'login' });
    },
    async handleSubmit() {
      if (this.valid) {
        try {
          await this.$store.dispatch('register', {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          });
          this.$toast.success('Registration successful');
          this.$router.push({ name: 'home' });
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message === "Email already exists") {
            this.$toast.error("This email is already registered.");
          } else {
            this.$toast.error("Registration Failed. Please try again later.");
          }
          console.error(error);
        }
      }
    },
  }
};
</script>


<style scoped>
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
</style>
