<template>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="4">
          <SideBar @update:currentTab="updateTab" />
        </v-col>
        <v-col cols="12" md="12">
          <component :is="currentTabComponent" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import MainAdminPage from './MainAdminPage.vue';
  import SideBar from './SideBar.vue';
  import TripsComponent from './tabs/TripsComponent.vue';
  import UsersComponent from './tabs/UsersComponent.vue';
  import ContactsComponent from './tabs/ContactsComponent.vue';
import ReservationsComponent from './tabs/ReservationsComponent.vue';
import TripsGalleries from './tabs/TripsGalleries.vue';
  export default {
    components: {
      MainAdminPage,
      SideBar,
      TripsComponent,
      UsersComponent,
      ContactsComponent,
      TripsGalleries

    },
    data() {
      return {
        currentTab: 'trips',
      };
    },
    computed: {
      currentTabComponent() {
        switch (this.currentTab) {
          case 'trips':
            return TripsComponent;
          case 'users':
            return UsersComponent;
          case 'contacts':
            return ContactsComponent;
            case 'reservations':
            return ReservationsComponent;
            case 'galleries':
            return TripsGalleries;
          default:
            return MainAdminPage;
        }
      },
    },
    methods: {
      updateTab(tabName) {
        this.currentTab = tabName;
      },
    },
  };
  </script>
  