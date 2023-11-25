const state = {
    reservationDetails: {}
  };
  
  const mutations = {
    SET_RESERVATION_DETAILS(state, details) {
      state.reservationDetails = details;
    },
    CLEAR_RESERVATION_DETAILS(state) {
      state.reservationDetails = {};
    }
  };
  
  const actions = {
    setReservationDetails({ commit }, details) {
      commit('SET_RESERVATION_DETAILS', details);
    },
    clearReservationDetails({ commit }) {
      commit('CLEAR_RESERVATION_DETAILS');
    }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  };