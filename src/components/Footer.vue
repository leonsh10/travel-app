<template>
  <v-footer color="#3f51b5">
    <v-container>
      <v-row>
        <v-col class="text-center white--text">
          <v-btn text icon color="white" @click="goTo('instagram')">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn text icon color="white" @click="goTo('facebook')">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn text icon color="white" @click="goTo('twitter')">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center white--text">
          <v-btn text color="white" @click="routeTo('home')">Home</v-btn>
          <v-btn text color="white" @click="routeTo('contact')">Contact</v-btn>
          <v-btn text color="white" @click="routeTo('about')">About</v-btn>
          <!-- Add more text links as needed -->
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center white--text">
          © 2024 LSH-VISTA
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    routeTo(page) {
      this.$router.push({ name: page });
    },
    goTo(platform) {
      const urls = {
        instagram: 'https://www.instagram.com',
        facebook: 'https://www.facebook.com',
        twitter: 'https://www.twitter.com',
      };
      window.open(urls[platform], '_blank');
    }
  }
};
</script>
