import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/userRanks"

class UserRankService {
   
    getUserRankById(id) {
        return axios.get(USER_BASE_URL+"/"+id)
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserRankService();