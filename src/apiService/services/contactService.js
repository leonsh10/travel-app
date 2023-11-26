import apiService from "../apiService";

const contactService = {
  sendForm(data) {
    return apiService.post("/contact/submit", data);
  },
  getContacts(){
    return apiService.get("/contact/all");
  },
  deleteContact(contactId) { 
    return apiService.delete(`/contact/delete/${contactId}`); 
  }
};

export default contactService;