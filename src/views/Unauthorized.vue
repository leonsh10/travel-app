<template>
    <v-container class="fill-height" fluid>
      <v-layout align-center justify-center>
        <v-flex text-center>
          <h1 class="display-2 mb-3">Unauthorized Access</h1>
          <v-icon size="120">mdi-lock</v-icon>
          <p class="title mt-3">Sorry, you do not have permission to view this page.</p>
          <v-btn color="primary" @click="goBack">Go Back</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>
  
  