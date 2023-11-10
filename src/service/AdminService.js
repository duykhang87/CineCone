import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/admin"

class AdminService {
    login(admin) {
        return axios.post(USER_BASE_URL+"/login",admin)
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new AdminService();