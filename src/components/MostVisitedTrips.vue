<template>
  <v-container class="container-bottom-padding">
    <v-row class="row-border-bottom">
      <v-col cols="4" class="center-flex-col">
        <img src="@/assets/homepageIcons/beach.svg" width="70" />
        <div class="text-column">
          <v-text class="heading-text">Top Destinations</v-text>
          <v-text class="subtext">Nulla pretium tincidunt felis, nec.</v-text>
        </div>
      </v-col>
      <v-col cols="4" class="center-flex-col">
        <img src="@/assets/homepageIcons/wallet.svg" width="70" />
        <div class="text-column">
          <v-text class="heading-text">The Best Prices</v-text>
          <v-text class="subtext">Sollicitudin mauris lobortis in.</v-text>
        </div>
      </v-col>
      <v-col cols="4" class="center-flex-col">
        <img src="@/assets/homepageIcons/suitcase.svg" width="70" />
        <div class="text-column">
          <v-text class="heading-text">Amazing Services</v-text>
          <v-text class="subtext">Nulla pretium tincidunt felis, nec.</v-text>
        </div>
      </v-col>
    </v-row>

    <v-row class="center-flex-row">
      <v-text class="info-text">SIMPLY AMAZING PLACES</v-text>
      <h3 class="title-text">Popular Destinations</h3>
    </v-row>

    <v-row class="row-top-margin">
      <carousel
        :perPageCustom="[[1024, 3]]"
        :navigationEnabled="false"
        :centerMode="true"
      >
        <slide v-for="trip in trips" :key="trip._id">
          <PopularDestionationsCard :trip="trip" />
        </slide>
     
      </carousel>
    </v-row>
  </v-container>
</template>

<script>
import PopularDestionationsCard from "./PopularDestinationsCard.vue";
import { Carousel, Slide } from "vue-carousel";
import tripService from '../apiService/services/tripService';

export default {
  components: {
    PopularDestionationsCard,
    Carousel,
    Slide,
  },
  data() {
      return {
        trips: [],
        filteredTrips: [],
        priceRange: [0, 1000],
      };
    },
    async mounted(){
      const { data } = await tripService.getTrips();
      this.trips = data;
    },
};
</script>

<style scoped>
.vue-carousel-slide {
  display: flex;
  justify-content: center;
}

.vue-carousel-inner {
  width: 100% !important;
}

.VueCarousel{
  width: 100%;
}

.VueCarousel-slide{
  width: 33.3333%;
}
.container-bottom-padding {
  padding-bottom: 50px;
}

.row-border-bottom {
  margin: 0 auto;
  margin-top: 30px;
  padding-bottom: 45px;
  border-bottom: 1px solid #72728c;
}

.center-flex-col {
  display: flex;
  justify-content: center;
}

.text-column {
  margin-left: 16px;
  padding-bottom: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.heading-text {
  font-size: 18px;
  color: #181818;
}

.subtext {
  color: #72728c;
  font-size: 14px;
}

.center-flex-row {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-text {
  font-family: 'Oswald', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #72728c;
  line-height: 0.75;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.title-text {
  margin-top: 26px;
  color: #181818;
  font-size: 48px;
}

.row-top-margin {
  margin-top: 99px;
}
</style>
