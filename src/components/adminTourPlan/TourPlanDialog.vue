<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        {{ editing ? "Edit Tour Plan" : "Add Tour Plan" }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              {{ this.tourPlanData }}
              <v-select
                label="Select Trip"
                v-model="selectedTripId"
                :items="tripsOptions"
                item-text="city"
                item-value="_id"
                return-object
              ></v-select>
            </v-col>
            <div v-for="(day, index) in numberOfDays" :key="index">
              <v-col cols="12">
                <v-text-field
                  :label="`Day ${index + 1} Title`"
                  v-model="tourPlan.days[index].title"
                  required
                ></v-text-field>
                <v-textarea
                  :label="`Day ${index + 1} Description`"
                  v-model="tourPlan.days[index].description"
                  required
                ></v-textarea>
              </v-col>
            </div>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="saveTourPlan"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import tripService from "../../apiService/services/tripService";

export default {
  props: {
    value: Boolean,
    editing: Boolean,
    tourPlanData: Object,
  },
  data() {
    return {
      dialog: false,
      selectedTripId: null,
      trips: [],
      selectedTrip: null,
      numberOfDays: 0,
      tripsOptions: [],
      tourPlan: {
        tripId: null,
        days: [],
      },
    };
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
      if (val && !this.editing) {
        this.initializeTrips();
      }
    },
    selectedTripId(newValue) {
      console.log("herereee");
      this.tourPlan.tripId = newValue;
      this.onTripSelect();
    },
  },
  methods: {
    initializeDialog() {
      this.initializeTrips();
      setTimeout(() => {
        if (this.editing && this.tourPlanData) {
          this.tourPlan = this.tourPlanData;
          console.log(this.tourPlan);
          this.selectedTripId = {
            _id: this.tourPlan.id,
            city: this.tourPlan.city
          }
        } else {
          this.resetTourPlan();
          this.fetchTrips();
        }
      }, 300);
    },
    closeDialog() {
      this.resetTourPlan();
      this.dialog = false;
    },
    saveTourPlan() {
      this.$emit("save", this.tourPlan);
      this.closeDialog();
    },
    async fetchTrips() {
      try {
        const response = await tripService.getTrips();
        this.trips = response.data.trips;
        this.tripsOptions = this.trips.map((trip) => ({
          city: trip.city,
          _id: trip._id,
        }));
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    },
    onTripSelect() {
      console.log("on trip selected", this.selectedTripId);
      this.selectedTrip = this.trips.find(
        (trip) => trip._id === this.selectedTripId._id
      );
      if (this.selectedTrip) {
        const departureDate = new Date(this.selectedTrip.departureTime);
        const returnDate = new Date(this.selectedTrip.returnTime);
        const timeDiff = Math.abs(
          returnDate.getTime() - departureDate.getTime()
        );
        this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        this.tourPlan.days = Array.from(
          { length: this.numberOfDays },
          (_, index) => ({
            title:
              (this.tourPlan.days[index] && this.tourPlan.days[index].title) ||
              "",
            description:
              (this.tourPlan.days[index] &&
                this.tourPlan.days[index].description) ||
              "",
          })
        );
      }
    },
    resetTourPlan() {
      this.tourPlan = { tripId: null, days: [] };
      this.selectedTripId = null;
      this.numberOfDays = 0;
    },
    initializeTrips() {
      if (!this.trips.length) {
        console.log("fetch tripsss");
        this.fetchTrips();
      }
    },
  },
};
</script>
