<template>
    <v-container style="padding-top:0;padding-bottom:0;">
      <v-select
        v-model="sort"
        :items="sortOptions"
        label="Sort by"
        @change="updateSortingMethod"
        style="padding:0;"
      ></v-select>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sort: '',
        sortOptions: [
          { text: 'Price: High to Low', value: 'price-desc' },
          { text: 'Price: Low to High', value: 'price-asc' },
          { text: 'Newest', value: 'newest' },
          { text: 'Oldest', value: 'oldest' },
        ],
      };
    },
    methods: {
      updateSortingMethod() {
        this.$emit('sort-trips', this.sort);
      },
    },
  };
  </script>