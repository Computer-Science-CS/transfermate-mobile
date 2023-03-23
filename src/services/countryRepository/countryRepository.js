import api from '../api';

const resource = '/paises'

export default {
    getCountry() {
        return api.get(`${resource}`)
    },
}
