<template>
  <v-container class="search-container">
    <v-row class="search-row">
      <v-col class="col-border-right">
        <span class="find-destination"
          >Find Your <strong>Destination</strong></span
        >
      </v-col>
      <v-col class="homepage-header-search col-width-25">
        <span class="label-text">When</span>
        <v-select
    v-model="selectedMonth"
    :items="months"
    label="Month"
    outlined
    solo
    hide-details
  ></v-select>
      </v-col>
      <v-col class="homepage-header-search col-width-25">
        <span class="label-text">Where</span>
        <v-text-field
    v-model="destination"
    label="Destination"
    outlined
    hide-details
    solo
  ></v-text-field>
      </v-col>
      <v-col class="homepage-header-search col-width-25">
        <span class="label-text">What</span>
        <v-select
    v-model="selectedCategory"
    :items="travelCategories"
    label="Type"
    outlined
    hide-details
    solo
  ></v-select>
      </v-col>
      <v-col class="col-width-12">
        <v-btn class="search-button" dark @click="search">SEARCH</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SearchHomepage",
  data() {
    return {
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
      travelCategories: ["Adventure", "Beach", "Sea", "Eco", "Luxury"],
      selectedMonth: null,
      destination: '',
      selectedCategory: null,
    };
  },
  methods: {
    search() {
      // Construct query parameters based on the selections
      const queryParams = {};

      if (this.selectedMonth) {
        queryParams.month = this.selectedMonth;
      }
      
      if (this.destination) {
        queryParams.destination = this.destination;
      }
      
      if (this.selectedCategory) {
        queryParams.category = this.selectedCategory;
      }

      // Use the router to navigate to the /trips route with query parameters
      this.$router.push({ path: '/trips', query: queryParams });
    },
  },
};
</script>

<style>
.search-container {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 90%;
}

.search-row {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  padding: 10px;
}

.col-border-right {
  min-width: 13%;
  max-width: 13%;
  border-right: 1px solid #eaeaea;
}

.find-destination {
  font-size: 20px;
}

.label-text {
  font-size: 18px;
}

.col-width-25 {
  min-width: 25%;
  max-width: 25%;
}

.col-width-12 {
  min-width: 12%;
  max-width: 12%;
}

.search-button {
  background-color: rgb(63, 81, 181);
}

.homepage-header-search span {
  padding-right: 10px;
}

.homepage-header-search {
  display: flex;
  align-items: center;
}

.v-select,
.v-text-field {
  border-radius: 5px;
}
</style>
