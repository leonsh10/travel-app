<template>
    <v-container>
      <v-row style="margin-top: 40px;">
        <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" outlined>
          <v-list-item three-line>
            <v-list-item-avatar tile size="120" color="grey lighten-4">
              <v-icon size="64">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="align-center">
              <v-list-item-title class="text-h4">{{ userProfile.fullName }}</v-list-item-title>
              <v-list-item-subtitle>{{ userProfile.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <!-- Any additional user information could go here -->
        </v-card>
      </v-col>
  
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" class="d-flex align-start">
              <v-card-title class="text-h5">Reserved Trips</v-card-title>
            </v-col>
            <v-col
              v-for="( index) in 10"
              :key="index"
              cols="12" sm="6" md="4"
            >
              <popular-destinations-card />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import PopularDestinationsCard from "../components/PopularDestinationsCard.vue";
  
  export default {
    components: {
      PopularDestinationsCard,
    },
    data() {
      return {
        userProfile: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          fullName: 'John Doe'
          // Add more user profile fields as needed
        },
        reservedTrips: [
          // Array of trips the user has reserved
          // Replace with your actual data structure
        ],
      };
    },
  };
  </script>
  
  <style>
  /* You can add custom CSS here to style your profile view */
  .v-list-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  </style>
  