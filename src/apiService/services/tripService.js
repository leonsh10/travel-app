import apiService from "../apiService";

const tripService = {
  addTrip(data) {
    return apiService.post("/trips/submit", data);
  },
  getTrips(){
    return apiService.get("/trips/all");
  },
  getSingleTrip(tripId){
    return apiService.get(`/trips/singletrip/${tripId}`);
  },
  deleteTrip(tripId) { 
    return apiService.delete(`/trips/delete/${tripId}`); 
  },
  editTrip(tripId, updatedData) {
    return apiService.put(`/trips/update/${tripId}`, updatedData);
  }
  // Add more user related methods here
};

export default tripService;