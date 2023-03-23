import api from "../api";

const resource = "/usuario";

export default {
  getUserDetailsById(id) {
    return api.get(`${resource}/${id}`);
  },
  getUserCoins(id) {
    return api.get(`${resource}-moedas/${id}`);
  },
  saveUserCoins(data) {
    return api.post(`${resource}-moedas/`, data);
  },
  updateUser(data) {
    return api.put(`${resource}`, data);
  }
};
