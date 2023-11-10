import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/users"

class UserService {
    login(user) {
        return axios.post(USER_BASE_URL + "/login", user);
    }
    getUserById(id) {
        return axios.get(USER_BASE_URL+"/"+id)
    }
    checkUserName(userName) {
        return axios.get(USER_BASE_URL+"/name?userName="+userName);
    }
    checkEmail(email) {
        return axios.get(USER_BASE_URL+"/email?Email="+email);
    }
    createUser(user) {
        return axios.post(USER_BASE_URL,user)
    }
    updatebio(id,bio) {
        return axios.put(USER_BASE_URL+"/bio/"+id,bio);
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();