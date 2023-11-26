<template>
  <v-container style="margin-top: 30px">
    <v-row style="margin: 0">
      <v-col cols="12" md="3">
        <Filters
          style="position: sticky; top: 72px; z-index: 1"
          @filter-changed="applyFilters"
          @update-url="updateUrl"
          @reset-filters="resetFilters"
        />
      </v-col>
      <v-col cols="12" md="9">
        <v-row
          style="
            display: flex;
            justify-content: flex-end;
            margin: 0;
            padding: 0;
          "
        >
          <v-col cols="4" style="padding-bottom: 0">
            <Sorting @sort-trips="applySortingMethod" :initialSort="sortMethod" />
          </v-col>
        </v-row>
        <v-row style="margin: 0" v-if="!loading && trips.length">
            <v-col cols="4" v-for="trip in trips" :key="trip._id">
              <PopularDestinationsCard :trip="trip" :listing="true" />
            </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; align-items: center; justify-content: center;">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
              size="70"
              width="7" 
              class="my-3"
            ></v-progress-circular>

            <div v-if="noResults">No results found.</div>

            <v-pagination
              v-if="!noResults && !loading"
              v-model="page"
              :length="totalPages"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Filters from "../components/Filters.vue";
import Sorting from "../components/Sorting.vue";
import PopularDestinationsCard from "../components/PopularDestinationsCard.vue";
import tripService from "../apiService/services/tripService";

export default {
  components: {
    Filters,
    Sorting,
    PopularDestinationsCard,
  },
  data() {
    return {
      loading: false,
      debounceTimeout: null,
      trips: [],
      page: 1,
      limit: 12,
      totalPages: 0,
      sortMethod: "",
      filters: {
        priceRange: [0, 5000],
        category: null,
        month: null,
        destination: '',
      },
    };
  },
  watch: {
    page(newPage) {
      console.log(newPage)
      this.fetchFilteredTrips();
    },
    $route(to) {
      if (to.path === '/trips') {
        this.readFromUrl();
        this.fetchFilteredTrips();
      }
    },
  },
  computed: {
    noResults() {
      return !this.loading && this.trips.length === 0;
    },
  },
  methods: {
    async fetchFilteredTrips() {
      this.loading = true;
      try {
        const response = await tripService.getTrips({
          page: this.page,
          limit: this.limit,
          sort: this.sortMethod,
          ...this.filters,
        });
        this.trips = response.data.trips;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error("There was an error fetching the trips:", error);
      } finally {
        setTimeout(() =>{
          this.loading = false;
        }, 800)
      }
    },
    applyFilters(filters) {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.filters = { ...this.filters, ...filters };
        this.page = 1;
        this.fetchFilteredTrips();
        this.updateUrl();
      }, 500);
    },
    resetFilters() {
      this.filters = { priceRange: [0, 5000], category: null, month: null };
      this.page = 1;
      this.fetchFilteredTrips();
      this.updateUrl();
    },
    applySortingMethod(sortMethod) {
      this.sortMethod = sortMethod;
      this.fetchFilteredTrips();
      this.updateUrl();
    },
    updateUrl() {
      const query = {};
      if (this.filters.priceRange[0] !== 0 || this.filters.priceRange[1] !== 5000) {
        query.priceRange = this.filters.priceRange.join(',');
      }
      if (this.filters.category) {
        query.category = this.filters.category;
      }
      if (this.filters.month) {
        query.month = this.filters.month;
      }
      if (this.sortMethod) {
        query.sort = this.sortMethod;
      }
      if (this.page !== 1) {
        query.page = this.page;
      }
      if (this.filters.destination) {
        query.destination = this.filters.destination;
      }
      this.$router.push({ name: 'trips', query }).catch(err => {console.log(err)});
    },
    readFromUrl() {
      const { destination, priceRange, category, month, sort, page } = this.$route.query;
      if (priceRange) {
        const [min, max] = priceRange.split(',').map(Number);
        this.filters.priceRange = [min, max];
      } else {
        this.filters.priceRange = [0, 5000];
      }
      this.filters.category = category || null;
      this.filters.month = month || null;
      this.sortMethod = sort || '';
      this.page = parseInt(page, 10) || 1;
      if (destination) {
        this.filters.destination = destination;
      }
    },
  },
  mounted() {
    this.readFromUrl();
    this.fetchFilteredTrips();
  },
};
</script>
