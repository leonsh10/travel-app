<template>
  <v-navigation-drawer permanent fixed app class="sidebar">
    <v-list dense>
      <v-list-item class="user-info">
        <v-list-item-avatar color="primary">
          <v-icon size="36" class="white--text">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="user-email-text white--text">
            {{ this.$store.state.auth.user.email }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click="goHome" class="home-icon">
          <v-icon class="white--text">mdi-arrow-left</v-icon>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-group no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="white--text"
              >Admin Dashboard</v-list-item-title
            >
          </v-list-item-content>
        </template>

        <v-list-item @click="selectTab('trips')" class="sidebar-item">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-airplane-takeoff</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">Trips</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="selectTab('galleries')" class="sidebar-item">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-airplane-takeoff</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">Trips Galleries</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="selectTab('users')" class="sidebar-item">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="selectTab('contacts')" class="sidebar-item">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-contacts</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">Contacts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="selectTab('reservations')" class="sidebar-item">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-calendar-clock</v-icon>
            <!-- Choose an icon that represents reservations -->
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text"
              >Reservations</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="white--text">Main Site</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item link :to="{ path: '/' }">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ path: '/contacts' }">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-email-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">Contacts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ path: '/about' }">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Add more main site links as needed -->
      </v-list-group>
    </v-list>

    <v-list
      dense
      class="logout-list"
      style="position: absolute; width: 100%; bottom: 0"
    >
      <!-- Optionally use a list item for semantic markup -->
      <v-list-item class="logout-button">
        <v-btn text block @click="logout" class="white--text">
          <v-icon left class="white--text">mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    goHome() {
      this.$router.push("/");
    },

    selectTab(tabName) {
      // Emit an event or use Vuex to update the main content area
      this.$emit("update:currentTab", tabName);
    },
    logout() {
      this.$store.dispatch("logout", this.$router); // Assuming you have set up your logout action properly
    },
    // No need for selectTab if we're using router links
  },
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100vh;
  background-color: #3f51b5;
}

.user-info,
.v-list-group__header,
.v-list-item {
  background-color: #3f51b5;
  color: white;
}

.white--text {
  color: white !important;
}

.home-icon {
  cursor: pointer;
}

.v-divider {
  background-color: white;
}

.v-icon {
  color: white;
}

/* Additional hover styles for list items */
.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Style for the group title */
.v-list-group__header {
  font-weight: 500;
}

/* Adjust padding for icons and content */
.v-list-item__icon,
.v-list-item__content {
  padding-right: 16px;
}

::v-deep .mdi-menu-down::before{
  color: white;
}
</style>
