<template>
  <v-row style="margin: 0">
    <v-col cols="12" class="home-top-header">
      <HeaderHomepage style="padding-top: 25px" />

      <v-container class="header-text-container">
        <v-text class="header-text"><i>"Journey Beyond the Horizon"</i></v-text>
      </v-container>

      <SearchHomepage />
    </v-col>

    <v-row style="margin: 0; width: 100%">
      <MostVisitedTrips />
    </v-row>

    <v-row style="margin: 0">
      <UsersTestimonials />
    </v-row>

    <v-row class="homepage-listing-trips">
      <ListingTripsHomepage />
    </v-row>
  </v-row>
</template>

<script>
import HeaderHomepage from "../components/HeaderHomepage.vue";
import SearchHomepage from "../components/SearchHomepage.vue";
import MostVisitedTrips from "../components/MostVisitedTrips.vue";
import ListingTripsHomepage from "../components/ListingTripsHomepage.vue";
import UsersTestimonials from "../components/UsersTestimonials.vue";
export default {
  components: {
    HeaderHomepage,
    SearchHomepage,
    MostVisitedTrips,
    ListingTripsHomepage,
    UsersTestimonials,
  },
};
</script>

<style scoped>
.home-top-header {
  background-image: url("../assets/homeBanner.jpg");
  background-size: cover;
  background-position: center;
  height: 600px;
  position: relative;
}

.home-top-header::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.header-text-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 90%;
}

.header-text {
  position: absolute;
  font-size: 40px;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
  width: 100%;
}

.homepage-listing-trips {
  width: 100%;
  background-color: #f9f9f9;
  margin: 0;
  padding-bottom: 20px;
}
</style>
