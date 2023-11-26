<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        {{ editing ? "Edit Trip" : "Add Trip" }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="trip.city"
                :rules="[rules.required]"
                label="City Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="trip.hotel"
                :rules="[rules.required]"
                label="Hotel Name"
                required
              ></v-text-field>

              <v-select
                :items="categories"
                item-text="name"
                item-value="id"
                v-model="trip.category"
                label="Select Category"
                required
              ></v-select>

              <v-textarea
                v-model="trip.shortDescription"
                :rules="[rules.required]"
                label="Short Description"
                required
              ></v-textarea>

              <v-textarea
                v-model="trip.largeDescription"
                :rules="[rules.required]"
                label="Large Description"
                required
              ></v-textarea>

              <v-text-field
                v-model="trip.location"
                :rules="[rules.required]"
                label="Google Maps Link"
                required
              ></v-text-field>

              <v-text-field
                v-model="trip.price"
                :rules="[rules.required, rules.number]"
                label="Price"
                type="number"
                required
              ></v-text-field>

              <v-menu
                ref="menuDeparture"
                v-model="menuDeparture"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="trip.departureTime"
                    label="Departure Time"
                    prepend-icon="mdi-calendar-clock"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="departureDate"
                  no-title
                  @input="menuTimeDeparture = true"
                ></v-date-picker>
                <v-time-picker
                  v-if="menuTimeDeparture"
                  v-model="departureTime"
                  no-title
                  @input="handleDepartureTime"
                ></v-time-picker>
              </v-menu>

              <v-menu
                ref="menuReturn"
                v-model="menuReturn"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="trip.returnTime"
                    label="Return Time"
                    prepend-icon="mdi-calendar-clock"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="returnDate"
                  no-title
                  @input="menuTimeReturn = true"
                ></v-date-picker>
                <v-time-picker
                  v-if="menuTimeReturn"
                  v-model="returnTime"
                  no-title
                  @input="handleReturnTime"
                ></v-time-picker>
              </v-menu>

              <v-chip-group
                v-model="trip.includes"
                active-class="chip--active"
                multiple
              >
                <v-chip
                  v-for="option in includeOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </v-chip>
              </v-chip-group>

              <v-text-field
                v-model="trip.likes"
                label="Likes"
                disabled
              ></v-text-field>

              <v-text-field
                v-model="trip.availability"
                :rules="[rules.required, rules.number, rules.positive]"
                label="Availability"
                type="number"
                required
              ></v-text-field>

              <v-text-field
                v-model="trip.sale"
                :rules="[rules.required, rules.number, rules.percentage]"
                label="Sale Percentage"
                type="number"
                required
              ></v-text-field>

              {{ trip }}
              <v-file-input
                :rules="[rules.required]"
                label="Card Image"
                accept="image/*"
                v-model="trip2.cardImageFile"
                @change="handleCardImageChange"
              ></v-file-input>

              <v-file-input
                :rules="[rules.required]"
                label="Landing Image"
                accept="image/*"
                v-model="trip2.landingImageFile"
                @change="handleLandingImageChange"
              ></v-file-input>

              <v-file-input
                :rules="[rules.required]"
                label="Gallery Images"
                accept="image/*"
                multiple
                v-model="trip2.galleryImagesFiles"
                @change="handleGalleryImagesChange"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isValid" color="blue darken-1" text @click="save"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    trip: {
      type: Object,
      default: () => ({
        city: "",
        hotel: "",
        category: "",
        shortDescription: "",
        largeDescription: "",
        location: "",
        price: 0,
        departureTime: "",
        returnTime: "",
        includes: [],
        likes: 0,
        availability: 0,
        sale: 0,
        cardImage: "",
        landingImage: "",
        galleryImages: [],
      }),
    },
    editing: Boolean,
  },

  data() {
    return {
      trip2: {
        cardImageFile: null,
        landingImageFile: null,
        galleryImagesFiles: [],
      },
      categories: ["Adventure", "Beach", "Sea", "Eco", "Luxury"],
      menuDeparture: false,
      menuTimeDeparture: false,
      menuReturn: false,
      menuTimeReturn: false,
      departureDate: null,
      departureTime: null,
      returnDate: null,
      returnTime: null,

      dialog: false,
      departureMenu: false,
      returnMenu: false,
      includeOptions: [
        "5 Star Accommodation",
        "Personal Guide",
        "Airport Transfers",
        "Breakfast",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        number: (value) => !isNaN(parseFloat(value)) || "Must be a number.",
        positive: (value) => value > 0 || "Must be positive.",
        percentage: (value) =>
          (value >= 0 && value <= 100) || "Must be between 0 and 100.",
      },
    };
  },

  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    },
  },
  computed: {
    isValid() {
      return (
        this.trip.city &&
        this.trip.hotel &&
        this.trip.category &&
        this.trip.shortDescription &&
        this.trip.largeDescription &&
        this.trip.location &&
        this.trip.price > 0 &&
        this.trip.departureTime &&
        this.trip.returnTime &&
        this.trip.includes &&
        this.trip.includes.length > 0 &&
        this.trip.availability > 0 &&
        this.trip.sale >= 0 &&
        this.trip.sale <= 100 &&
        this.trip.cardImage &&
        this.trip.landingImage &&
        this.trip.galleryImages &&
        this.trip.galleryImages.length > 0
      );
    },
  },
  methods: {
    handleDepartureTime(time) {
      if (time) {
        const date = this.departureDate || this.getDefaultDate();
        this.trip.departureTime = `${date}T${time}`;
        this.menuDeparture = false;
        this.menuTimeDeparture = false;
      }
    },
    handleReturnTime(time) {
      if (time) {
        const date = this.returnDate || this.getDefaultDate();
        this.trip.returnTime = `${date}T${time}`;
        this.menuReturn = false;
        this.menuTimeReturn = false;
      }
    },
    getDefaultDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
    closeDialog() {
      this.dialog = false;
      this.$emit("update:value", false);
    },
    save() {
      this.$emit('save', this.trip);
    },

    handleCardImageChange(file) {
      this.trip.cardImage = file
        ? file.name
        : this.trip2 &&
          this.trip2.cardImageFile &&
          this.trip2.cardImageFile.name
        ? this.trip2.cardImageFile.name
        : "";
    },

    handleLandingImageChange(file) {
      this.trip.landingImage = file
        ? file.name
        : this.trip2 && this.trip2.landingImage && this.trip2.landingImage.name
        ? this.trip2.landingImage.name
        : "";
    },

    handleGalleryImagesChange(files) {
      if (files && files.length > 0) {
        this.trip.galleryImages = files.map((file) => file.name);
      } else if (this.trip2 && this.trip2.galleryImages) {
        this.trip.galleryImages = this.trip2.galleryImages.map(
          (img) => img.name
        );
      } else {
        this.trip.galleryImages = [];
      }
    },
  },
};
</script>

<style scoped>
.chip--active {
  background-color: green !important;
  color: white !important;
}

/* Add additional styling for chip hover state if needed */
.v-chip:hover {
  background-color: rgba(0, 128, 0, 0.5) !important;
}
</style>
