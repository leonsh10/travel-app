<template>
    <v-container>
      <TripGalleryTable />
    </v-container>
  </template>
  
  <script>
  import TripGalleryTable from "../../../components/adminGalleryTrips/GalleryTripTable.vue";
  export default {
    components: {
        TripGalleryTable,
    },
  };
  </script>
  