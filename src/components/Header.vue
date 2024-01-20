<template>
  <div>
    <v-navigation-drawer app v-model="drawer" v-if="$vuetify.breakpoint.smAndDown">
      <v-list dense>
        <v-list-item @click="goTo('home')">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('about')">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('contact')">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" class="flex-sm-column" dark :height="computedHeight" style="flex-direction:column;">
      <v-container class="d-flex align-center" :class="{'pt-0 pb-0 pl-0 pr-0': $vuetify.breakpoint.smAndDown}">
        <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <img :src="require('@/assets/logo23.png')" alt="Logo" width="165" style="cursor:pointer; margin-right: 25px; height: 65px; object-fit:contain;" @click="goTo('home')" />

        <template v-if="!$vuetify.breakpoint.smAndDown">
          <v-text-field
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
          ></v-text-field>

          <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
          <v-btn text class="white--text" @click="goTo('trips')">Trips</v-btn>
          <v-btn text class="white--text" @click="goTo('contact')">Contact</v-btn>
          <v-btn text class="white--text" @click="goTo('about')">About</v-btn>

        </template>
        <v-menu offset-y >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="!isLoggedIn" text class="white--text" :class="{'ml-auto': $vuetify.breakpoint.smAndDown}" @click="login">Login</v-btn>
            <v-btn v-else icon class="white--text auth-button" :class="{'ml-auto': $vuetify.breakpoint.smAndDown}" v-bind="attrs" v-on="on">
              <v-icon large>mdi-account</v-icon>
              <span class="pl-2">{{ user.name }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout" v-if="isLoggedIn">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('profile')" v-if="isLoggedIn ">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('admin')" v-if="isLoggedIn && isAdmin ">
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      
      </v-container>

      <v-text-field
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
            v-if="$vuetify.breakpoint.smAndDown"
            class="searchbar-header"
          ></v-text-field>
    </v-app-bar>
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
      return this.$store.state.auth.user
    },
    computedHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '115px' : '64px';
    }
  },
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    },
    login() {
      this.goTo("login");
    },
    logout() {
      this.$store.dispatch("logout", this.$router);
    },
  },
};
</script>

<style scoped>
.white--text {
  color: white !important;
}

.auth-button{
  width:fit-content !important;
  padding-left:5px;
  padding-right: 5px;
  border-radius: 25%;
}

.auth-button span{
  max-width: 95px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}



@media screen and (max-width: 600px){
  .auth-button span{
    max-width: 85px;
  }
  ::v-deep header .v-toolbar__content{
  flex-wrap:wrap;
}

.searchbar-header{
    min-width: 100%;
  }
}
</style>
