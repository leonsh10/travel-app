import apiService from "../apiService";

const reservationService = {
  submitReservation(data) {
    return apiService.post("/reservation/submit", data);
  },
  saveReservation(data) {
    return apiService.post("/reservation/save", data);
  },
  verifyPayment(sessionId) {
    return apiService.post("/reservation/verify-payment", { sessionId });
  },
  createCheckoutSession(data) {
    return apiService.post("/reservation/create-checkout-session", data);
  },
  getReservations() {
    return apiService.get("/reservation/all");
  },
  deleteReservation(reservationId) { 
    return apiService.delete(`/reservation/delete/${reservationId}`); 
  },
  async updateReservationStatus(reservationId, data) {
    return apiService.put(`/reservation/update-status/${reservationId}`, data);
  },
};

export default reservationService;