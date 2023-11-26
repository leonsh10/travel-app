<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="showAddDialog = true">Add New Tour Plan</v-btn>
        </v-col>
      </v-row>
  
      <v-data-table :headers="tourPlanHeaders" :items="tourPlans" class="elevation-1">
        <template v-slot:item.days="{ item }">
    <div v-for="(day, index) in item.days" :key="index" style="padding-top: 30px;">
      <h3>{{ `Day ${day.dayNumber}: ${day.title} `}}</h3>
      <h4>{{ day.description }}</h4>
    </div>
  </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon color="blue" @click="openEditDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="openDeleteDialog(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
  
      <!-- Assume you have TourPlanDialog and TourPlanPreviewDialog components -->
      <tour-plan-dialog
        v-model="showAddDialog"
        :tourPlan="currentTourPlan"
        ref="addTourPlanDialog"
        :editing="false"
        @save="saveTourPlan"
      ></tour-plan-dialog>
  
      <tour-plan-dialog
        v-model="showEditDialog"
        :tourPlanData="editableTourPlan"
        :editing="true"
        ref="tourPlanDialog"
        @save="saveTourPlan"
      ></tour-plan-dialog>
  
  
      <!-- Delete Confirmation Dialog -->
      <!-- ... -->
    </v-container>
  </template>
  
  <script>
  import TourPlanDialog from "./TourPlanDialog.vue";
  import tourPlanService from "../../apiService/services/tourPlanService"; // Update the path as needed
  
  export default {
    name: "TourPlanTable",
    components: {
      TourPlanDialog,
    },
    data() {
      return {
        currentTourPlan: {
          name: "",
          description: "",
          days: [], // Array to hold the days of the tour plan
        },
        editableTourPlan: {},
        showAddDialog: false,
        showEditDialog: false,
        showDeleteDialog: false,
        tourPlanHeaders: [
          { text: "Tour Name", value: "city", align: "start", sortable: true },
          { text: "Days", value: "days", sortable: true },
          { text: "Actions", value: "actions", sortable: false },
        ],
        tourPlans: [],
      };
    },
    mounted() {
      this.getTourPlans();
    },
    methods: {
      async getTourPlans() {
        try {
          const response = await tourPlanService.getAllTourPlans();
          this.tourPlans = response.data; // Adjust according to your API response structure
        } catch (error) {
          console.error(error);
          // Handle error (e.g., using a toast notification or setting an error message in data)
        }
      },
      openEditDialog(tourPlan) {
      this.editableTourPlan = Object.assign({}, tourPlan);
      this.showEditDialog = true;
      this.$refs.tourPlanDialog.initializeDialog(); // Call initializeDialog when opening the dialog
    },

    openAddDialog() {
      this.showAddDialog = true;
      this.$refs.addTourPlanDialog.initializeDialog(); // Call initializeDialog for the add dialog
    },
      async saveTourPlan(tourPlanData) {
        if (this.editableTourPlan && this.editableTourPlan.id) {
          // Update existing tour plan
          await tourPlanService.updateTourPlan(this.editableTourPlan.id, tourPlanData);
        } else {
          // Create new tour plan
          await tourPlanService.createTourPlan(tourPlanData);
        }
        this.getTourPlans();
        this.showAddDialog = false;
        this.showEditDialog = false;
      },
      async deleteTourPlan() {
        await tourPlanService.deleteTourPlan(this.editableTourPlan.id);
        this.getTourPlans();
        this.showDeleteDialog = false;
      },
      resetCurrentTourPlan() {
        this.currentTourPlan = {
          name: "",
          description: "",
          days: [],
        };
      }
    },
  };
  </script>
  