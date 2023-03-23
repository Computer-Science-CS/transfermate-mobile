import axios from 'axios';

export default {
    sendNewProposalNotication(data) {
        return axios({
            method: 'POST',
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        })
    }
}