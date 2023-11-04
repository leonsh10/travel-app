import apiService from "../apiService";

const userService = {
  register(data) {
    return apiService.post("/auth/register", data);
  },
  login(data) {
    return apiService.post("/auth/login", data);
  },
  // Add more user related methods here
};

export default userService;