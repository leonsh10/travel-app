<template>
    <v-container>
        <Header />
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card class="text-center pa-4">
            <v-icon large color="red">mdi-alert-octagon</v-icon>
            <v-card-title class="pt-4">Payment Cancelled</v-card-title>
            <v-card-text>
              <p>Your payment was not completed.</p>
              <p>If this is an error, please try booking again.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="tryAgain">Try Again</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <Footer />
    </v-container>
  </template>
  
  <script>
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  export default {
    components:{
        Header,
        Footer
    },
    methods: {
      tryAgain() {
        this.$router.push('/trips');
      },
    },
  };
  </script>
  