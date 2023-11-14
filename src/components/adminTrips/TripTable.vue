<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="showAddDialog = true"
          >Add New Trip</v-btn
        >
      </v-col>
    </v-row>

    <v-data-table :headers="tripHeaders" :items="trips" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="blue" @click="openEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="openDeleteDialog(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon color="green" @click="openPreviewDialog(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <trip-dialog
      v-model="showAddDialog"
      :trip="currentTrip"
      :editing="false"
      @save="saveTrip"
    ></trip-dialog>

    <trip-dialog
      v-model="showEditDialog"
      :trip="editableTrip"
      :editing="true"
      @save="saveTrip"
    ></trip-dialog>

    <trip-preview-dialog
      v-model="showPreviewDialog"
      :trip="editableTrip"
    ></trip-preview-dialog>

    <v-dialog v-model="showDeleteDialog" max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this trip?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="showDeleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="red" text @click="deleteTrip">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TripDialog from "./TripDialog.vue";
import TripPreviewDialog from "./TripPreviewDialog.vue";
import tripService from "../../apiService/services/tripService";
export default {
  name: "Triptable",
  components: {
    TripDialog,
    TripPreviewDialog,
  },
  data() {
    return {
      currentTrip: {
        city: "",
        hotel: "",
        category: "",
        shortDescription: "",
        largeDescription: "",
        location: "", // This should be a link to a Google Maps iframe
        price: 0,
        departureTime: "",
        returnTime: "",
        includes: [], // This will hold selections like "5 Star Accommodation"
        likes: 0, // Starting at 0, as it's not user-editable
        availability: 10, // Default availability
        sale: 0, // Percentage of the sale
        cardImage: "",
        landingImage: "",
        galleryImages: [],
      },

      editableTrip: {
        city: "",
        hotel: "",
        category: "",
        shortDescription: "",
        largeDescription: "",
        location: "", // This should be a link to a Google Maps iframe
        price: 0,
        departureTime: "",
        returnTime: "",
        includes: [], // This will hold selections like "5 Star Accommodation"
        likes: 0, // Starting at 0, as it's not user-editable
        availability: 10, // Default availability
        sale: 0, // Percentage of the sale
        cardImage: "",
        landingImage: "",
        galleryImages: [],
      },

      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      showPreviewDialog: false,
      tripHeaders: [
        { text: "City Name", value: "city", align: "start", sortable: true },
        { text: "Hotel Name", value: "hotel", sortable: true },
        { text: "Departure Time", value: "departureTime", sortable: true },
        { text: "Return Time", value: "returnTime", sortable: true },
        { text: "Price", value: "price", sortable: true },
        { text: "Availability", value: "availability", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      trips: [],
    };
  },
  mounted(){
      this.getTrips();
    },
  methods: {
    openEditDialog(trip) {
      this.editing = true;
      this.editableTrip = Object.assign({}, trip);
      this.showEditDialog = true;
    },
    openDeleteDialog(trip) {
      this.editableTrip = trip;
      this.showDeleteDialog = true;
    },
    openPreviewDialog(trip) {
      this.editableTrip = trip;
      this.showPreviewDialog = true;
    },
    async getTrips() {
      const { data } = await tripService.getTrips();
      this.trips = data;
    },

    async deleteTrip(){
      await tripService.deleteTrip(this.editableTrip._id).then(() =>{
        this.$toast.success('Trip deleted succesfully.');
        this.getTrips();
      }).catch(() =>{
        this.$toast.error('Trip deleted failed.');
      }).finally(() =>{
        this.editableTrip = null;
        this.showDeleteDialog = false;
      })
    },
   
    async saveTrip(tripData) {
      if (this.editing) {
        // Logic to handle updating an existing trip
        await tripService
          .editTrip(tripData._id, tripData)
          .then(() => {
            this.$toast.success("Trip updated succesfully.");
            this.getTrips();
          })
          .catch(() => {
            this.$toast.error("Trip failed to update.");
          })
          .finally(() => {
            this.showEditDialog = false;
            this.resetCurrentTrip();
            this.editing = false;
          });
      } else {
        // Logic to handle adding a new trip
        await tripService
          .addTrip(tripData)
          .then(() => {
            this.$toast.success("Trip added succesfully.");
            this.getTrips();
          })
          .catch(() => {
            this.$toast.error("Trip failed to add.");
          })
          .finally(() => {
            this.showAddDialog = false;
            this.resetCurrentTrip();
            this.editing = false;

          });
      }
    },
    resetCurrentTrip() {
      this.currentTrip = {
        city: "",
        hotel: "",
        shortDescription: "",
        largeDescription: "",
        location: "",
        price: 0,
        departureTime: "",
        returnTime: "",
        includes: [],
        likes: 0,
        availability: 10,
        sale: 0,
        galleryImages: [],
        landingImage: "",
        cardImage: "",
      };
    },
  },
};
</script>
