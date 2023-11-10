import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/types"

class TypeService {
    getAll() {
        return axios.get(USER_BASE_URL);
    }
    create(type) {
        return axios.post(USER_BASE_URL,type);
    }
   
  
    
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new TypeService();