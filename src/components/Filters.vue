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
      priceRange: [0, 1000], // Use an array for the v-range-slider
      minPrice: 0, // Minimum value for the price range
      maxPrice: 5000, // Maximum value for price range
      category: null,
      month: null,
      categories: ["Adventure", "Beach", "Cultural", "Eco", "Luxury"], // example categories
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

  methods: {
    syncPriceRange(newValue) {
      // Directly emit the new value since v-range-slider provides an array
      this.updatePriceFilter(newValue);
    },
    updatePriceFilter(newValue) {
      // You might want to use newValue or this.priceRange here
      this.$emit("filter-by-price", newValue || this.priceRange);
    },
    updateCategoryFilter() {
      this.$emit("filter-by-category", this.category);
    },
    updateMonthFilter() {
      this.$emit("filter-by-month", this.month);
    },
    resetFilters() {
      this.priceRange = [this.minPrice, this.maxPrice];
      this.category = null;
      this.month = null;

      // Emit an event if you need to notify the parent component
      // to reset any external states or queries based on these filters
      this.$emit('reset-filters');
    },
  },
};
</script>
