import api from '../api';

const resource = '/auth'

export default {
    authUser(data) {
        return api.post(`${resource}/login`, data)
    },
    createNewUser(data) {
        return api.post(`${resource}/registro`, data)
    },
    createNewUserSocialMidia(data) {
        return api.post(`${resource}/social-midia`, data)
    },
}