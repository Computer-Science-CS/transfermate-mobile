import api from "../api";

const resource = "/solicitacoes";

export default {
  createNewRequest(data) {
    return api.post(`${resource}`, data);
  },
  getRequests() {
    return api.get(`${resource}`);
  },
  getRequestByUserId(id) {
    return api.get(`${resource}/usuario/${id}`);
  },
  deleteRequestById(id) {
    return api.delete(`${resource}/${id}`);
  },
};
