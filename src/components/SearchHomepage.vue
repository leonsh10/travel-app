<template>
  <v-container class="search-container">
    <v-row class="search-row">
      <v-col class="col-border-right">
        <v-text class="find-destination"
          >Find Your <strong>Destination</strong></v-text
        >
      </v-col>
      <v-col class="homepage-header-search col-width-25">
        <v-text class="label-text">When</v-text>
        <v-select
          :items="months"
          label="Month"
          outlined
          solo
          hide-details
        ></v-select>
      </v-col>
      <v-col class="homepage-header-search col-width-25">
        <v-text class="label-text">Where</v-text>
        <v-text-field
          label="Destination"
          outlined
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-col class="homepage-header-search col-width-25">
        <v-text class="label-text">What</v-text>
        <v-select
          :items="travelCategories"
          label="Type"
          outlined
          hide-details
          solo
        ></v-select>
      </v-col>
      <v-col class="col-width-12">
        <v-btn class="search-button" dark>SEARCH</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SearchHomepage",
  data() {
    return {
      months: ["January", "February", "March" /* ...other months */],
      travelCategories: [
        "Beach",
        "Mountain",
        "City",
        "Cruise" /* ...other categories */,
      ],
    };
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

.homepage-header-search v-text {
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
