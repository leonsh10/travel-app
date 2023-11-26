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
  
  
      <v-dialog v-model="showDeleteDialog" max-width="300px">
        {{ this.editableTourPlan }}
      <v-card>
        <v-card-title class="text-h5">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this trip?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="showDeleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="red" text @click="deleteTourPlan">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </template>
  
  <script>
  import TourPlanDialog from "./TourPlanDialog.vue";
  import tourPlanService from "../../apiService/services/tourPlanService";
  
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
          days: [],
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
          this.tourPlans = response.data; 
        } catch (error) {
          console.error(error);
        }
      },
      openEditDialog(tourPlan) {
      this.editableTourPlan = Object.assign({}, tourPlan);
      this.showEditDialog = true;
      this.$refs.tourPlanDialog.initializeDialog();
    },
    openDeleteDialog(tour) {
      this.editableTourPlan = tour;
      this.showDeleteDialog = true;
    },
    openAddDialog() {
      this.showAddDialog = true;
      this.$refs.addTourPlanDialog.initializeDialog(); 
    },
      async saveTourPlan(tourPlanData) {
        if (this.editableTourPlan && this.editableTourPlan.id) {
          await tourPlanService.updateTourPlan(this.editableTourPlan.id, tourPlanData);
        } else {
          await tourPlanService.createTourPlan(tourPlanData);
        }
        this.getTourPlans();
        this.showAddDialog = false;
        this.showEditDialog = false;
      },
      resetCurrentTourPlan() {
        this.currentTourPlan = {
          name: "",
          description: "",
          days: [],
        };
      },
      async deleteTourPlan(){
      await tourPlanService.deleteTourPlan(this.editableTourPlan.id).then(() =>{
        this.$toast.success('Tour plan deleted succesfully.');
        this.getTourPlans();
      }).catch(() =>{
        this.$toast.error('Tour plan deleted failed.');
      }).finally(() =>{
        this.editableTourPlan = null;
        this.showDeleteDialog = false;
      })
    },
    },
  };
  </script>
  