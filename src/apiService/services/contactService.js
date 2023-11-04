import apiService from "../apiService";

const contactService = {
  sendForm(data) {
    return apiService.post("/contact/submit", data);
  },
  // Add more user related methods here
};

export default contactService;