<template>
    <v-container style="margin-top: 30px;">
      <v-row style="margin:0;">
        <v-col cols="12" md="3" >
          <Filters style="position:sticky;top:72px;z-index:1;" @filter-by-price="applyPriceFilter" 
                   @filter-by-category="applyCategoryFilter"
                   @filter-by-month="applyMonthFilter"
                   :priceRange.sync="priceRange" />
        </v-col>
        <v-col cols="12" md="9">
            <v-row style="display: flex;justify-content: flex-end; margin:0; padding:0;">
                <v-col cols="4" style="padding-bottom:0;">
                    <Sorting @sort-trips="applySortingMethod" />
                </v-col>
            </v-row>
          <v-row style="margin:0;">
            <v-row cols="12">
                <v-col cols="4" v-for="trip in trips" :key="trip._id">
                    <PopularDestinationsCard :trip="trip" />
                </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import Filters from '../components/Filters.vue';
  import Sorting from '../components/Sorting.vue';
  import PopularDestinationsCard from '../components/PopularDestinationsCard.vue';
import tripService from '../apiService/services/tripService';
  
  export default {
    components: {
      Filters,
      Sorting,
      PopularDestinationsCard,
    },
    data() {
      return {
        // initial data
        trips: [], // this should be fetched or imported
        filteredTrips: [],
        priceRange: [0, 1000],
      };
    },
    created() {
      this.filteredTrips = this.trips; // initialize filteredTrips
    },
    async mounted(){
      const { data } = await tripService.getTrips();
      this.trips = data;
      console.log(this.trips)
    },
    methods: {
      applyPriceFilter(price) {
        console.log(price)
        // filter logic
      },
      applyCategoryFilter(category) {
        console.log(category)
        // filter logic
      },
      applyMonthFilter(month) {
        console.log(month)
        // filter logic
      },
      applySortingMethod(sortMethod) {
        console.log(sortMethod);
        // sorting logic
      },
    },
  };
  </script>
  