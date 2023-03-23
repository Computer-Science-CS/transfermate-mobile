import api from "../api";

const resource = "/transacao";

export default {
    updateTransactionById(data) {
        return api.put(`${resource}`, data)
    },

    getTransactions(idUsuario){
        return api.get(`${resource}/usuario/qtd/${idUsuario}`)
    }
}