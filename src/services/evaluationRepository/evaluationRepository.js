import api from "../api";

const resource = "/avaliacoes";

export default {
  setEvaluationRequestPropose(data) {
    return api.post(`${resource}`, data);
  },
  getEvaluationByUserId(id) {
    return api.get(`${resource}/usuario/${id}`)
  },
  getEvaluationByUserIdAvaliado(id) {
    return api.get(`${resource}/usuario/avaliado/${id}`)
  },
  getEvaluations() {
    return api.get(`${resource}`);
  }
  
};
