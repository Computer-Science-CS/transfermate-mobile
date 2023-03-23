import api from '../api';

const resource = '/moedas'

export default {
    getCoins() {
        return api.get(`${resource}`)
    },
    getCoinById(id) {
        return api.get(`${resource}/${id}`)
    }
}