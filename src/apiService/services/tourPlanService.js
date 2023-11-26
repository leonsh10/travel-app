import apiService from "../apiService";

const tourPlanService = {
  getAllTourPlans() {
    return apiService.get("/tourplans");
  },
  getTourPlanById(tourPlanId) {
    return apiService.get(`/tourplans/${tourPlanId}`);
  },
  createTourPlan(data) {
    return apiService.post("/tourplans", data);
  },
  updateTourPlan(tourPlanId, updatedData) {
    return apiService.put(`/tourplans/${tourPlanId}`, updatedData);
  },
  deleteTourPlan(tourPlanId) {
    return apiService.delete(`/tourplans/${tourPlanId}`);
  },
  // Add more tour plan related methods here if needed
};

export default tourPlanService;
