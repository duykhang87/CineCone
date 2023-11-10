import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/movies"

class MovieService {
   
    getMovieById(id) {
        return axios.get(USER_BASE_URL+"/"+id)
    }
    getAllMovie() {
        return axios.get(USER_BASE_URL)
    }
    create(movie) {
        return axios.post(USER_BASE_URL,movie)
    }
    poster(id, poster) {
        const formData = new FormData();
            formData.append('file', poster); 
        return axios.post(USER_BASE_URL+"/poster/"+id,formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        } )
    }
    gettop5 () {
        return axios.get("http://127.0.0.1:5000/processed_data")
    }
    getMoviesByIds(ids ) {
        return axios.get(USER_BASE_URL+"/s",ids);
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new MovieService();