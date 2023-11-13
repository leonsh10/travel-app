import apiService from "../apiService";

const userService = {
  register(data) {
    return apiService.post("/auth/register", data);
  },
  login(data) {
    return apiService.post("/auth/login", data);
  },
  getUsers(){
    return apiService.get("/auth/users");
  },
  editUserRole(userId, newRole) { 
    return apiService.put(`auth/user/edit-role/${userId}`, { role: newRole }); 
  },
  deleteUser(userId) { 
    return apiService.delete(`auth/user/${userId}`); 
  }
};

export default userService;