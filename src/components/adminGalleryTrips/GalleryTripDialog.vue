<template>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ editing ? 'Edit' : 'Add' }} Gallery</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="trips"
                  item-text="name"
                  item-value="id"
                  v-model="gallery.tripId"
                  label="Select Trip"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-file-input label="Card Image" v-model="gallery.cardImage" accept="image/*"></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input label="Landing Image" v-model="gallery.landingImage" accept="image/*"></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input label="Gallery Images" v-model="gallery.galleryImages" accept="image/*" multiple></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'GalleryDialog',
    props: {
        editing: {
      type: Boolean,
      default: false
    },
    gallery: {
      type: Object,
      default: () => ({})
    },
    value: { // This prop is bound to what v-model is passed in the parent
      type: Boolean,
      default: false
    }
    },
    data() {
      return {
        dialog: false,
        trips: [] // This should be populated with trip data
      };
    },
    watch: {
    value(val) {
      this.dialog = val; // Update the dialog visibility when the prop changes
    },
    dialog(val) {
      this.$emit('input', val); // Emit input event to update the parent's v-model
    }
  },
    methods: {
      close() {
        this.$emit('input', false);
      },
      save() {
        this.$emit('save', this.gallery);
        this.close();
      }
    },
    created() {
      // Fetch trips data here or receive it as a prop
    }
  };
  </script>
  
  <style scoped>
  /* Add any styles specific to this component here */
  </style>
  