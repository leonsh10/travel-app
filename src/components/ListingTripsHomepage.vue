<template>
  <v-container>
    <span class="listing-trips-title">Find Your Perfect Tour</span>
    <span class="listing-trips-desc">
      "Embark on a journey of discovery with our curated tours. Whether you're longing for the serene beaches of Bali, the rich history and culture of Italy, or the lush landscapes of Indonesia,
       we have something special for you. Experience the vibrant traditions and breathtaking 
      scenery of Thailand. Each destination is an opportunity to create memories that will last a lifetime. Take advantage of our special offers and book your dream tour today!"
    </span>
    <v-row style="margin: 0" class="listing-products-homepage">
      <v-col lg="3" xl="3" xs="2" v-for="trip in trips" :key="trip._id">
        <PopularDestionationsCard :trip="trip" />
      </v-col>

      <v-col cols="12" style="display: flex; justify-content: center">
        <v-col cols="3">
          <v-btn
            block
            rounded
            size="x-large"
            class="see-more-trips"
            @click="goTo('trips')"
            >SEE ALL TRIPS</v-btn
          >
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PopularDestionationsCard from "./PopularDestinationsCard.vue";
import tripService from "../apiService/services/tripService";

export default {
  components: {
    PopularDestionationsCard,
  },
  data() {
    return {
      trips: [],
    };
  },
  async mounted() {
  try {
    const response = await tripService.getTrips();
    if (response.data) {
      const allTrips = response.data.trips;
      const availableTrips = allTrips.filter((trip) => trip.availability > 0);
      this.trips = availableTrips.slice(0, 8);
    }
  } catch (error) {
    console.error('Error fetching trips:', error);
  }
},
  methods: {
  
    goTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style>
.listing-products-homepage .destination-card-wrapper {
  padding-right: 0px;
}

.listing-trips-title {
  font-size: 40px;
  margin-bottom: 27px;
  color: #303030;
  margin-top: 80px;
  display: flex;
  justify-content: center;
}

.listing-trips-desc {
  font-size: 18px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 80px;
  line-height: 33px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  color: #999;
}

.see-more-trips {
  background-color: rgb(63, 81, 181) !important;
  color: #fff !important;
}
</style>
