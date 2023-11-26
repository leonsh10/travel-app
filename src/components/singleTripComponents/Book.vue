<template>
  <v-container style="padding-right: 0px">
    <div v-if="hasToken">
      <v-card class="pa-5" outlined>
        <v-card-title class="text-h5 pb-3">BOOK THIS TOUR</v-card-title>
        <v-form ref="form" v-model="valid">
          <v-text-field
            label="Name *"
            prepend-icon="mdi-pencil"
            :rules="nameRules"
            v-model="name"
            required
            disabled
          ></v-text-field>

          <v-text-field
            label="Email *"
            prepend-icon="mdi-email"
            :rules="emailRules"
            v-model="email"
            required
            disabled
          ></v-text-field>

          <v-text-field
            label="Phone"
            prepend-icon="mdi-phone"
            :rules="phoneRules"
            v-model="phone"
          ></v-text-field>

          <v-text-field
            label="Date (dd-mm-yy) *"
            prepend-icon="mdi-calendar"
            :rules="dateRules"
            v-model="date"
            required
          ></v-text-field>

          <v-text-field
            label="Number of tickets *"
            prepend-icon="mdi-ticket-confirmation"
            :rules="ticketsRules"
            v-model="numberOfTickets"
            required
          ></v-text-field>

          <v-textarea
            label="Message"
            v-model="message"
            auto-grow
            rows="1"
          ></v-textarea>
          <v-btn v-if="trip.availability != 0" color="pink" class="mt-3" :disabled="!valid" @click="validate">
            BOOK NOW
          </v-btn>
          <v-btn v-else class="mt-3" color="red">
            SOLDOUT
          </v-btn>
        </v-form>
      </v-card>
    </div>
    <div v-else>
      <v-alert type="info"> You need to log in to book this tour. </v-alert>
      <v-btn color="primary" @click="goToLogin"> Login </v-btn>
    </div>
  </v-container>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import reservationService from "../../apiService/services/reservationService";

export default {
  props: {
    trip: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      stripePromise: null,
      valid: false,
      name: this.$store.state.auth.user.name,
      email: this.$store.state.auth.user.email,
      phone: "",
      date: "",
      numberOfTickets: "",
      message: "",
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => !v || v.length <= 15 || "Phone must be less than 15 characters",
        (v) =>
          !v ||
          /^\+?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4,6})$/.test(v) ||
          "Phone must be valid",
      ],
      dateRules: [
        (v) => !!v || "Date is required",
        (v) =>
          /^\d{2}-\d{2}-\d{4}$/.test(v) || "Date must be in DD-MM-YYYY format",
      ],
      ticketsRules: [
        (v) => !!v || "Number of tickets is required",
        (v) => (v && v > 0) || "Must be at least one ticket",
      ],
    };
  },
  created() {
    this.stripePromise = loadStripe("pk_test_51ODtxZINlcfGJ7KFg1rYd8hJSZEmig2Ab0PnQE6ZofgNul0RsRTBLQUIf5JRiuzIvt2JRlHiyaAb0cVBCc4BJQKh00R9TpmzKR");
  },
  mounted() {
    const session_id = this.$route.query.session_id;
    if (session_id) {
      this.finalizeReservation(session_id);
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.bookTour();
      }
    },
    async bookTour() {
      try {
        const response = await reservationService.createCheckoutSession({
          effectivePrice: this.trip.effectivePrice,
          numberOfTickets: this.numberOfTickets,
        });

        const sessionId = response.data.id;
        const stripe = await this.stripePromise;
        const reservationDetails = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        date: this.date, 
        numberOfTickets: this.numberOfTickets, 
        message: this.message, 
        tripId: this.trip._id, 
      };
        localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));
        await stripe.redirectToCheckout({ sessionId });
  
      } catch (error) {
        console.error('Error:', error);
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    hasToken() {
      return !!this.$store.state.auth.token;
    },
  },
};
</script>


<style scoped>
.v-card {
  max-width: 400px;
  margin: auto;
}

.v-btn {
  width: 100%;
  margin-top: 10px;
  color: white;
}

/* If you want to add specific styles to the button that checks availability */
.grey--text.text--lighten-1 {
  color: #757575; /* This color is a placeholder; adjust as needed */
}

/* You may need to adjust the colors to match the exact shades you want */
</style>
