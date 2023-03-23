import api from "../api";

const resource = "/proposta";

export default {
  createNewRequestSolicitation(data) {
    return api.post(`${resource}`, data);
  },
  getRequestsSolicitationsByUser(id) {
    return api.get(`${resource}/usuario-proposta/${id}`);
  },
  getRequestsSolicitationsById(id) {
    return api.get(`${resource}/${id}`);
  },
  declineRequestSolicitation(id) {
    return api.put(`${resource}/recusar/${id}`);
  },
  acceptRequestSolicitation(id) {
    return api.put(
      `${resource}/aceitar/${id}`
    );
  },
  deleteRequestSolicitation(id) {
    return api.delete(`${resource}/${id}`);
  },
};
