<template>
  <v-container>
    <v-row style="margin-top: 40px">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" outlined>
          <v-list-item three-line>
            <v-list-item-avatar tile size="120" color="grey lighten-4">
              <v-icon size="64">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="align-center">
              <v-list-item-title class="text-h4">{{
                this.$store.state.auth.user.name
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                this.$store.state.auth.user.email
              }}</v-list-item-subtitle>
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
            v-for="(trip, index) in reservedTrips"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <popular-destinations-card :trip="trip.tripId" />
          </v-col>

          <v-col v-if="!reservedTrips.length" cols="12">
            You don't have any reservation!
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userService from "../apiService/services/userService";
import PopularDestinationsCard from "../components/PopularDestinationsCard.vue";
export default {
  components: {
    PopularDestinationsCard,
  },
  data() {
    return {
      reservedTrips: [],
    };
  },
  async mounted() {
    await this.getUserReservations();
  },
  methods: {
    async getUserReservations() {
      try {
        const token = this.$store.state.auth.token;
        const email = this.$store.state.auth.user.email;
        console.log("tokeeen", token);
        if (!token || !email) {
          console.error("Token or email is missing.");
          return;
        }

        const response = await userService.getUserReservation(token, email);

        if (response.data) {
          this.reservedTrips = response.data.reservations;
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    },
  },
};
</script>

<style>
/* You can add custom CSS here to style your profile view */
.v-list-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
