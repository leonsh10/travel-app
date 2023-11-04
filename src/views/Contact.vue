<template>
  <v-container style="margin-top: 40px; margin-bottom: 40px">
    <v-row style="display: flex; justify-content: center">
      <v-col cols="4">
        <h2 style="display: flex; align-items: center">
          <img
            src="@/assets/logoNoBg.png"
            style="width: 60px; margin-right: 10px"
          />

          Get in touch

        </h2>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="subject"
            :rules="subjectRules"
            label="Subject"
            required
          ></v-text-field>

          <v-textarea
            v-model="message"
            :rules="messageRules"
            label="Message"
            required
          ></v-textarea>

          <v-btn
            type="submit"
            color="primary"
            :disabled="!isFormValid"
            >Send Message</v-btn
          >
        </v-form>
      </v-col>

      <v-col
        cols="4"
        style="
          padding: 30px 40px;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background-color: #3f51b5;
          color: white;
        "
      >
        <h3>Contact us</h3>
        <div class="info-item">
          <v-icon class="info-icon" color="white">mdi-map-marker</v-icon>
          <strong>Address:</strong> 198 West 21th, Suite 721
        </div>
        <div class="info-item">
          <v-icon class="info-icon" color="white">mdi-phone</v-icon>
          <strong>Phone:</strong> +1235 2355 98
        </div>
        <div class="info-item">
          <v-icon class="info-icon" color="white">mdi-email</v-icon>
          <strong>Email:</strong> info@yoursite.com
        </div>
        <div class="info-item">
          <v-icon class="info-icon" color="white">mdi-web</v-icon>
          <strong>Website:</strong> yoursite.com
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import contactService from '../apiService/services/contactService';

export default {
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  },
  validations: {
    name: { required },
    email: { required, email },
    subject: { required },
    message: { required }
  },
  computed: {
    isFormValid() {
      return !this.$v.$invalid;
    },
    nameRules() {
      return [
      (v) => !!v || "Name is required"
      ];
    },
    emailRules() {
        return [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ];
    },
    subjectRules() {
      return [
      (v) => !!v || "Subject is required"
      ];
    },
    messageRules() {
      return [
      (v) => !!v || "Message is required"

      ];
    },
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = {
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message
        };
        try{
            await contactService.sendForm(data);
            this.name = ''
            this.email = ''
            this.subject = ''
            this.message = ''
        }
        catch(error){
            if (error.response && error.response.data) {
              this.$toast.error(error.response.data.message);
            }
        }
      }
    },
  },
};
</script>

<style scoped>
.info-item {
  margin-bottom: 16px;
}

.info-icon {
  background-color: rgb(111, 190, 255);
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  color: #3f51b5; /* background color for the circle */
}
</style>
