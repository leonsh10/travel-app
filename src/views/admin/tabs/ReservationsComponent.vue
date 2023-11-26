<template>
  <v-container>
    <v-data-table
      :headers="reservationHeaders"
      :items="reservations"
      class="elevation-1"
    >
      <template v-slot:item.status="{ item }">
        <v-chip :color="statusColor(item.status)" dark>{{
          item.status
        }}</v-chip>
      </template>

      <template v-slot:item.totalCost="{ item }">
        {{ calculateTotalCost(item).toFixed(2) }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn icon color="blue" @click="openEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="openDeleteDialog(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" persistent max-width="300px">
      <v-card>
        <v-card-title>Edit Reservation Status</v-card-title>
        <v-card-text>
          <v-select
            v-model="editableReservation.status"
            :items="statusOptions"
            label="Status"
            solo
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="saveStatus" style="color: white"
            >Save</v-btn
          >
          <v-btn color="grey" @click="editDialog = false" style="color: white"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import reservationService from "../../../apiService/services/reservationService";

export default {
  data() {
    return {
      reservationHeaders: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Trip City", value: "tripId.city" },
        { text: "Number of Tickets", value: "numberOfTickets" },
        { text: "Total Cost", value: "totalCost" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "action", sortable: false },
      ],
      reservations: [],
      editDialog: false,
      editableReservation: {}, 
      statusOptions: ["pending", "completed", "cancelled"],
    };
  },
  computed: {
    totalCost() {
      return this.reservations.map((reservation) => {
        const tripPrice = reservation.tripId.effectivePrice;
        const numberOfTickets = reservation.numberOfTickets;
        const taxes = 0.18; // 18% taxes
        return (tripPrice * numberOfTickets * (1 + taxes)).toFixed(2);
      });
    },
  },
  created() {
    this.fetchReservations();
  },
  methods: {
    calculateTotalCost(reservation) {
      const tripPrice = reservation.tripId.effectivePrice;
      const numberOfTickets = reservation.numberOfTickets;
      const taxPercentage = 0.18; // 18% tax
      return tripPrice * numberOfTickets * (1 + taxPercentage);
    },
    async fetchReservations() {
      try {
        const response = await reservationService.getReservations();
        this.reservations = response.data;
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    },
    openEditDialog(reservation) {
      this.editableReservation = { ...reservation };
      this.editDialog = true;
    },
    async saveStatus() {
      try {
        const response = await reservationService.updateReservationStatus(
          this.editableReservation._id,
          {
            status: this.editableReservation.status,
          }
        );
        if (response.data) {
          this.fetchReservations();
          this.editDialog = false;
        }
      } catch (error) {
        console.error("Error updating reservation status:", error);
      }
    },
    async deleteReservation(reservationId) {
      try {
        await reservationService.deleteReservation(reservationId);
        this.fetchReservations(); 
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    },
    statusColor(status) {
      switch (status) {
        case "pending":
          return "orange";
        case "completed":
          return "green";
        case "cancelled":
          return "red";
        default:
          return "grey";
      }
    },
  },
};
</script>
