<template>
  <div style="position: relative; z-index: 10">
    <v-navigation-drawer
      app
      v-model="drawer"
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <!-- Navigation items for mobile -->
      <v-list dense>
        <v-list-item @click="goTo('home')">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('trips')">
          <v-list-item-title>Trips</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('about')">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('contact')">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div
      app
      color="indigo"
      class="flex-sm-column"
      dark
      :height="computedHeight"
    >
      <v-container
        class="d-flex align-center"
        :class="{ 'pt-0 pb-0 pl-0 pr-0': $vuetify.breakpoint.smAndDown }"
      >
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.smAndDown"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <!-- Logo -->
        <img
          :src="require('@/assets/logoText.png')"
          alt="Logo"
          width="165"
          style="cursor: pointer; margin-right: 25px"
          @click="goTo('home')"
        />

        <!-- Search bar and other items for larger screens -->
        <template v-if="!$vuetify.breakpoint.smAndDown">
          <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
          <v-btn text class="white--text" @click="goTo('trips')">Trips</v-btn>
          <v-btn text class="white--text" @click="goTo('contact')"
            >Contact</v-btn
          >

          <v-btn text class="white--text" @click="goTo('about')">About</v-btn>
        </template>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="!isLoggedIn"
              text
              class="white--text"
              :class="{ 'ml-auto': $vuetify.breakpoint.smAndDown }"
              @click="login"
              >Login</v-btn
            >
            <v-btn
              v-else
              icon
              class="white--text auth-button"
              :class="{ 'ml-auto': $vuetify.breakpoint.smAndDown }"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon large>mdi-account</v-icon>
              <span class="pl-2">{{ user.name }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout" v-if="isLoggedIn">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('profile')" v-if="isLoggedIn">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('admin')" v-if="isLoggedIn && isAdmin">
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.auth.token;
    },
    isAdmin(){
      return this.$store.state.auth.user.role == 'admin';

    },
    user() {
      return this.$store.state.auth.user;
    },
    computedHeight() {
      return this.$vuetify.breakpoint.smAndDown ? "115px" : "64px";
    },
  },
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    },
    login() {
      // Here you would add your login logic
      this.goTo("login");
    },
    logout() {
      this.$store.dispatch("logout", this.$router); // Assuming you have set up your logout action properly
    },
  },
};
</script>

<style scoped>
.white--text {
  color: white !important;
}

.auth-button {
  width: fit-content !important;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 25%;
}

.auth-button span {
  max-width: 95px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.header-homepage {
  flex-direction: column;
  position: absolute;
  top: -64px;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .header-homepage {
    top: -115px;
  }
  .auth-button span {
    max-width: 85px;
  }
  ::v-deep header .v-toolbar__content {
    flex-wrap: wrap;
  }

  .searchbar-header {
    min-width: 100%;
  }
}
</style>
