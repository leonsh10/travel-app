<template>
    <v-container style="height: 100%; justify-content: center;">
      <v-row justify="center">
        <v-col cols="12" md="6" style="align-self:center;">
          <v-card class="text-center pa-4">
            <v-icon large color="green">mdi-check-circle</v-icon>
            <v-card-title class="pt-4" style="justify-content: center; display:flex;">Payment Successful!</v-card-title>
            <v-card-text>
              <p>Your payment was processed successfully.</p>
              <p>Your booking is going to be checked by admin. After that you will accept ticket bills in email.</p>
              <p>Thank you:)</p>
            </v-card-text>
            <v-card-actions style="display: flex; justify-content: center;">
              <v-btn color="primary" @click="goHome">Go Home</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import reservationService from "../apiService/services/reservationService";

  export default {
    data(){
    return{
        reservationDetails: {}
    }
    },
    created() {
  const sessionId = this.$route.query.session_id;
  if (sessionId) {
    this.finalizeReservation(sessionId);
  }
},
    methods: {
      goHome() {
        this.$router.push('/');
      },
      async finalizeReservation(sessionId) {
    try {
      this.reservationDetails = JSON.parse(localStorage.getItem('reservationDetails'));

      const verificationResponse = await reservationService.verifyPayment(sessionId);
      if (!verificationResponse.data.success) {
        throw new Error('Payment verification failed');
      }

      await reservationService.saveReservation({
        ...this.reservationDetails,
        paymentIntentId: sessionId
      }).then(()=>{
        localStorage.removeItem('reservationDetails');
      });


    } catch (error) {
      console.error('Failed to finalize reservation:', error);
    }
  }
    },
  };
  </script>
  