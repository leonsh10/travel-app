import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
instance.interceptors.request.use(
  async (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Attach the token to the Authorization header
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
instance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    // Check if the HTTP status code indicates an Unauthorized request
    if (error.response && error.response.status === 401) {
      // Handle token expiry or unauthorized access here
      // You can remove the token from localStorage
      localStorage.removeItem("token");
      // Optionally, redirect the user to the login page or show a login modal
      // window.location = '/login';
      // You can also dispatch a Vuex/Pinia action to update the user state
      // store.dispatch('auth/logout');
    }
    // Forward the error to be handled in the component or in another global error handler
    return Promise.reject(error);
  }
);

export default instance;