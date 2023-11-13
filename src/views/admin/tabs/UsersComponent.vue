<template>
  <v-container>
    <!-- User Management Table -->
    <v-card>
      <v-card-title class="headline">User Management</v-card-title>
      <v-data-table :headers="headers" :items="users" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <v-icon large color="red" class="mr-2" @click="confirmDelete(item)">
            mdi-delete
          </v-icon>
          <v-icon large color="blue" @click="startEdit(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Edit Role Dialog -->
    <v-dialog v-model="editDialog" persistent max-width="300px">
      <v-card>
        <v-card-title>Edit User Role</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedRole"
            :items="['simple', 'admin']"
            label="Role"
            solo
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="saveRole" style="color: white"
            >Save</v-btn
          >
          <v-btn color="grey" @click="editDialog = false" style="color: white"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog for Deletion -->
    <v-dialog v-model="deleteDialog" persistent max-width="300px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="deleteUser">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import userService from "../../../apiService/services/userService";
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Last Name", value: "lastname" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "Actions", value: "action", sortable: false },
      ],
      users: [],
      selectedUser: null,
      selectedRole: "",
      editDialog: false,
      deleteDialog: false,
      userToDelete: null,
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    async getAllUsers() {
      const { data } = await userService.getUsers();
      this.users = data;
    },
    confirmDelete(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },
    async deleteUser() {
      await userService
        .deleteUser(this.userToDelete._id)
        .then(() => {
          this.$toast.success("User deleted succesfully.");
          this.getAllUsers();
        })
        .catch(() => {
          this.$toast.error("User failed to delete.");
        })
        .finally(() => {
          this.deleteDialog = false;
          this.userToDelete = null;
        });
    },
    startEdit(user) {
      this.selectedUser = user;
      this.selectedRole = user.role;
      this.editDialog = true;
    },
    async saveRole() {
      if (this.selectedUser) {
        this.selectedUser.role = this.selectedRole;
        await userService
          .editUserRole(this.selectedUser._id, this.selectedUser.role)
          .then(() => {
            this.$toast.success("User role succesfully updated.");
            this.getAllUsers();
          })
          .catch(() => {
            this.$toast.error("User role didnt update.");
          })
          .finally(() => {
            this.editDialog = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.v-data-table .v-icon {
  cursor: pointer;
}
.v-data-table .mr-2 {
  margin-right: 8px;
}
</style>
