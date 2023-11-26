<template>
  <v-container style="padding-top:0;padding-bottom:0;">
    <v-select
      v-model="sort"
      :items="sortOptions"
      label="Sort by"
      @change="emitSortingMethod"
      style="padding:0;"
    ></v-select>
  </v-container>
</template>

<script>
export default {
  props: {
    initialSort: String,
  },
  data() {
    return {
      sort: this.initialSort || '',
      sortOptions: [
        { text: 'Price: High to Low', value: 'price-desc' },
        { text: 'Price: Low to High', value: 'price-asc' },
      ],
    };
  },
  methods: {
    emitSortingMethod() {
      this.$emit('sort-trips', this.sort);
    },
  },
  watch: {
    initialSort(newValue) {
      this.sort = newValue;
    },
  },
};
</script>
