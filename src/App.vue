<template>
  <v-app>
    <Header v-if="showHeaderAndFooter && showHeader" />
    <v-main>
      <!-- Routed components will be displayed here -->
      <router-view></router-view>
    </v-main>
    <Footer v-if="showHeaderAndFooter" />
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    showHeaderAndFooter() {
      const currentRouteName = this.$route.name;
      return currentRouteName !== 'login' && currentRouteName !== 'register';
    },

    showHeader(){
      const currentRouteName = this.$route.name;
      return currentRouteName !== 'home'
    }
  },
};
</script>