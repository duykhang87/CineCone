import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/age-limits"

class AgeLimitService {
    getAll () {
        return axios.get(USER_BASE_URL)
    }
    createAgeLimit(ageLimit) {
        return axios.post(USER_BASE_URL,ageLimit)
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new AgeLimitService();