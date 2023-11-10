import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/actors"

class ActorService {
   
    getActorById(id) {
        return axios.get(USER_BASE_URL+"/"+id)
    }
    getAll() {
        return axios.get(USER_BASE_URL)
    }
    create(actor) {
        return axios.post(USER_BASE_URL,actor)
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ActorService();