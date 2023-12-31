import apiService from "../apiService";

const tripService = {
  addTrip(data) {
    return apiService.post("/trips/submit", data);
  },
  getTrips(params) {
    return apiService.get("/trips/all", { params });
  },
  getSingleTrip(tripId){
    return apiService.get(`/trips/singletrip/${tripId}`);
  },
  deleteTrip(tripId) { 
    return apiService.delete(`/trips/delete/${tripId}`); 
  },
  editTrip(tripId, updatedData) {
    return apiService.put(`/trips/update/${tripId}`, updatedData);
  },
  getTripsWithReservations() {
    return apiService.get('/trips/with-reservations');
  },
};

export default tripService;