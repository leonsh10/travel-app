<template>
  <v-container>
    <v-card>
      <v-card-title> Contact Messages </v-card-title>
      <v-data-table :headers="headers" :items="messages" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="confirmDelete(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Confirm Deletion</v-card-title>
        <v-card-text
          >Are you sure you want to delete this contact message?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="deleteMessage">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import contactService from '../../../apiService/services/contactService';
export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Subject", value: "subject" },
        { text: "Message", value: "message" },
        { text: "Actions", value: "action", sortable: false },
      ],
      messages: [
      ],
      messageToDelete: null,
    };
  },
   mounted(){
    this.getContacts();
  },
  methods: {
    async getContacts() {
      const { data } = await contactService.getContacts();
    this.messages = data;
    },
    confirmDelete(item) {
      this.messageToDelete = item;
      this.dialog = true;
    },
    async deleteMessage() {
      await contactService.deleteContact(this.messageToDelete._id).then(() =>{
        this.$toast.success('Contact deleted succesfully.');
    this.getContacts();
        
      }).catch(() => {
        this.$toast.error("Contact failed to delete.");
      }).finally(() =>{
        this.dialog = false;
        this.messageToDelete = null;
      })
     
    },
  },
};
</script>

<style scoped>
.v-data-table .v-icon {
  color: red;
  cursor: pointer;
  font-size: 30px !important;
}
</style>
