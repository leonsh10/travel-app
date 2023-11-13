<template>
    <v-container>
      <!-- Existing Trip Table -->
      <!-- ... your existing trip table code ... -->
  
      <!-- Gallery Table -->
      <v-row>
        <v-col>
          <v-btn color="secondary" @click="showAddGalleryDialog = true">Add Gallery</v-btn>
        </v-col>
      </v-row>
  
      <v-data-table :headers="galleryHeaders" :items="galleries" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-btn icon color="blue" @click="openEditGalleryDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="openDeleteGalleryDialog(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
  
      <!-- Gallery Dialogs -->
      <gallery-dialog
  v-model="showAddGalleryDialog"
  :gallery="currentGallery"
  @save="saveGallery"
></gallery-dialog>

<gallery-dialog
  v-model="showEditGalleryDialog"
  :gallery="editableGallery"
  :editing="true"
  @save="saveGallery"
></gallery-dialog>
  
      <v-dialog v-model="showDeleteGalleryDialog" persistent max-width="300px">
        <!-- Delete Confirmation Dialog -->
      </v-dialog>
    </v-container>
  </template>
  

  <script>
import GalleryDialog from "./GalleryTripDialog.vue";

export default {
  name: "TripGalleryTable",
  components: {
    // ... your existing components ...
    GalleryDialog,
  },
  data() {
    return {
      // ... your existing data properties ...
      currentGallery: {
        tripId: '', // ID of the selected trip
        cardImage: '',
        landingImage: '',
        galleryImages: []
      },
      editableGallery: {
        // Similar structure to currentGallery
      },
      showAddGalleryDialog: false,
    showEditGalleryDialog: false,
      showDeleteGalleryDialog: false,
      galleryHeaders: [
        { text: "Trip ID", value: "tripId" },
        { text: "Card Image", value: "cardImage" },
        { text: "Landing Image", value: "landingImage" },
        { text: "Gallery", value: "galleryImages" },
        { text: "Actions", value: "actions" },
      ],
      galleries: [
        // Array of gallery objects
      ],
    };
  },
  methods: {
    // ... your existing methods ...
    openEditGalleryDialog(gallery) {
      this.editableGallery = Object.assign({}, gallery);
      this.showEditGalleryDialog = true;
    },
    openDeleteGalleryDialog(gallery) {
      this.editableGallery = gallery;
      this.showDeleteGalleryDialog = true;
    },
    saveGallery(galleryData) {
        console.log(galleryData)
      // Logic to handle updating or adding a gallery
      this.showAddGalleryDialog = false;
      this.showEditGalleryDialog = false;
      // Reset currentGallery or update galleries list
    },
    // Additional methods as required
  },
};
</script>
