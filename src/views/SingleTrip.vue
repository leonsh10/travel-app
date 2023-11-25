<template>
  <v-row class="no-margin">
    <v-col cols="12" class="home-top-header">
      <img :src="tripImageSrc" alt  class="background-image-trip" />
      <HeaderHomepage class="header-homepage-padding" />
      <v-container class="header-text-container">
        <span class="header-text">{{ trip.city }}</span>
        <span class="header-text-desc">{{ trip.shortDescription }}</span>
      </v-container>
    </v-col>
    <v-col cols="12" class="footer-style">
      <v-container class="footer-container">
        <span>Voyagevista / {{ trip.city }}</span>
        <div class="social-media">
          <v-btn icon href="https://facebook.com/yourpage" target="_blank">
            <v-icon> mdi-facebook </v-icon>
          </v-btn>
          <v-btn icon href="https://twitter.com/yourpage" target="_blank">
            <v-icon> mdi-twitter </v-icon>
          </v-btn>
          <v-btn icon href="https://instagram.com/yourpage" target="_blank">
            <v-icon> mdi-instagram </v-icon>
          </v-btn>
          <v-btn icon href="https://linkedin.com/in/yourpage" target="_blank">
            <v-icon> mdi-linkedin </v-icon>
          </v-btn>
          <!-- Add more icons as needed -->
        </div>
      </v-container>
    </v-col>

    <v-row class="no-margin">
      <v-container class="tab-container">
        <v-col cols="9" md="8">
          <v-tabs v-model="activeIndex" class="fixed-tabs">
            <v-tab class="tab-width" v-for="item in items" :key="item.title">
              {{ item.title }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="activeIndex">
            <v-tab-item
              v-for="item in items"
              :key="item.title"
              class="tab-item-style"
            >
              <v-row class="ion-row-style">
                <!-- Dynamically render the appropriate component based on the item.id -->
                <component :is="getComponent(item.id)" :trip="trip"></component>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-col>

        <v-col cols="3" md="4" class="test-col">
          <Book :trip="trip" />
        </v-col>
      </v-container>
    </v-row>
  </v-row>
</template>

<script>
import HeaderHomepage from "../components/HeaderHomepage.vue";
import Gallery from "../components/singleTripComponents/Gallery.vue";
import Information from "../components/singleTripComponents/Information.vue";
import Location from "../components/singleTripComponents/Location.vue";
import Reviews from "../components/singleTripComponents/Reviews.vue";
import TourPlan from "../components/singleTripComponents/TourPlan.vue";
import Book from "../components/singleTripComponents/Book.vue";
import tripService from "../apiService/services/tripService";

export default {
  components: {
    HeaderHomepage,
    TourPlan,
    Reviews,
    Location,
    Information,
    Gallery,
    Book,
  },
  data: () => ({
    backgroundImageUrl: '',
    trip: {},
    items: [
      { title: "Information", id: 0, component: "Information" },
      { title: "Tour Plan", id: 1, component: "TourPlan" },
      { title: "Location", id: 2, component: "Location" },
      { title: "Gallery", id: 3, component: "Gallery" },
      { title: "Reviews", id: 4, component: "Reviews" },
    ],
    activeIndex: 0,
  }),
  computed: {
    tripImageSrc() {
      // Check if trip and trip.city are defined
      if (this.trip && this.trip.city) {
        // Construct the image path and return it
        return require(`@/assets/tours/${this.trip.city.replace(/\s/g, '').toLowerCase()}/single-trip.jpg`);
      }
      return ''
    }
  },
  async mounted() {
    const tripId = this.$route.params.id;
    const { data } = await tripService.getSingleTrip(tripId);
    this.trip = data;
  },
  methods: {
    getComponent(id) {
      const foundItem = this.items.find((item) => item.id === id);
      return foundItem ? foundItem.component : null;
    },
  },
};
</script>

<style scoped>
.no-margin {
  margin: 0;
}

.header-homepage-padding {
  padding-top: 25px;
}

.footer-style {
  background-color: #f9f9f9;
  height: 92px;
  min-height: 92px;
  display: flex;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-top-header {
  height: 600px;
  position: relative;
  z-index: 8;
  margin:0;
  padding:0;
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
  z-index:5;
}


.background-image-trip{
  position:absolute; height:600px; width:100%; top:0; z-index: 1;
}
.header-text-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-text {
  font-family: Lato, sans-serif;
  font-size: 60px;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
  width: 100%;
}

.header-text-desc {
  line-height: 1.666666666666667em;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
  text-align: center;
  font-size: 18px;
}

.tab-hover::before,
.tab-active::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: red; /* Replace with your color */
  border-radius: 2px;
}

.v-tab {
  position: relative;
  overflow: hidden;
}

.fixed-tabs {
  border-bottom: 1px solid #eaeaea;
}

.tab-width {
  max-width: 150px;
  margin-left: 0;
}

.tab-item-style {
  margin: 0;
  margin-top: 40px;
  display: flex;
}

.ion-row-style {
  margin: 0;
  display: flex;
}

.tab-container {
  margin-top: 40px;
  display: flex;
}

.test-col {
  /* Styles for the test column */
}
</style>
