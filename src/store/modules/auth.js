import userService from '../../apiService/services/userService';
import axios from "axios";

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null, 
  token: localStorage.getItem('token') || '',
};

const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData.user;
    state.token = userData.token;
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user)); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  },
  CLEAR_USER_DATA(state) {
    state.user = null;
    state.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    delete axios.defaults.headers.common['Authorization'];
  }
};

const actions = {
  async register({ commit }, userData) {
    try {
      const response = await userService.register(userData);
      commit('SET_USER_DATA', { user: response.data.user, token: response.data.token });
      return response.data;
    } catch (error) {
      console.error('Registration Failed', error.response.data);
      throw error.response.data;
    }
  },
  async login({ commit }, credentials) {
    try {
      const response = await userService.login(credentials);
      commit('SET_USER_DATA', { user: response.data.user, token: response.data.token });
    } catch (error) {
      console.error('Login Failed', error.response.data);
      throw error.response.data;
    }
  },
  logout({ commit }, router) { 
    localStorage.removeItem('token');
    
    commit('CLEAR_USER_DATA');
    
    delete axios.defaults.headers.common['Authorization'];
    
    if (router) router.push('/'); 
  }
};

export default {
  state,
  mutations,
  actions,
};
