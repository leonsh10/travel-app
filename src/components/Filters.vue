<template>
  <v-container style="padding: 0">
    <!-- Filter by Price -->
    <v-row>
      <!-- Price Range Selection -->
      <v-col cols="12" md="12" style="padding: 0">
        <v-card flat>
          <v-card-title class="subtitle-1"> Price Range </v-card-title>
          <v-card-text>
            <v-row style="margin-top: 10px">
              <v-col cols="12">
                <v-range-slider
                  v-model="priceRange"
                  :min="minPrice"
                  :max="maxPrice"
                  @input="syncPriceRange"
                  thumb-label="always"
                ></v-range-slider>
              </v-col>
            </v-row>

            <v-row
              align="center"
              no-gutters
              style="justify-content: space-between"
            >
              <v-col cols="6" md="5">
                <v-text-field
                  v-model="priceRange[0]"
                  label="Min Price"
                  type="number"
                  outlined
                  dense
                  @input="updatePriceFilter"
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="5" class="d-flex justify-end">
                <v-text-field
                  v-model="priceRange[1]"
                  label="Max Price"
                  type="number"
                  outlined
                  dense
                  @input="updatePriceFilter"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Filter by Category -->
    <v-select
      v-model="category"
      :items="categories"
      label="Select Category"
      @change="updateCategoryFilter"
    ></v-select>

    <!-- Filter by Month -->
    <v-select
      v-model="month"
      :items="months"
      label="Select Month"
      @change="updateMonthFilter"
    ></v-select>

    <v-row>
      <v-col class="text-center">
        <v-btn color="error" @click="resetFilters">Reset Filters</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      priceRange: [0, 5000], // Use an array for the v-range-slider
      minPrice: 0, // Minimum value for the price range
      maxPrice: 5000, // Maximum value for price range
      category: null,
      month: null,
      categories: ["Adventure", "Beach", "Sea", "Eco", "Luxury"], // example categories
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  watch: {
    priceRange: {
      handler(newRange) {
        if (newRange.min > newRange.max) {
          newRange.min = newRange.max;
        } else if (newRange.max < newRange.min) {
          newRange.max = newRange.min;
        }
        this.updatePriceFilter();
      },
      deep: true,
    },
  },

  $route: {
    immediate: true,
    handler() {
      this.setFiltersFromUrl();
    }
  },

  created() {
  this.setFiltersFromUrl();
},

  methods: {
    syncPriceRange(newValue) {
      this.updatePriceFilter(newValue);
    },
    updatePriceFilter(newValue) {
      console.log(newValue)
      this.emitFilters();
    },
    updateCategoryFilter() {
      this.emitFilters();
    },
    updateMonthFilter() {
      this.emitFilters();
    },
    resetFilters() {
      this.priceRange = [this.minPrice, this.maxPrice];
      this.category = null;
      this.month = null;
      this.emitFilters();
    },
    emitFilters() {
    this.$emit('filter-changed', {
      priceRange: this.priceRange,
      category: this.category,
      month: this.month,
    });
    
    // Emit an additional event for parent component to update the URL
    this.$emit('update-url');
  },

    setFiltersFromUrl() {
    const queryParams = this.$route.query;
    
    if (queryParams.priceRange) {
      const [min, max] = queryParams.priceRange.split(',').map(Number);
      this.priceRange = [min, max];
    }
    
    if (queryParams.category) {
      this.category = queryParams.category;
    }
    
    if (queryParams.month) {
      this.month = queryParams.month;
    }
  },

  },
};
</script>
