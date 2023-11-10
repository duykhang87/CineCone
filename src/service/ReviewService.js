import axios from 'axios'


const USER_BASE_URL = "http://localhost:8080/reviews"

class ReviewService {
    getAllReviews() {
        return axios.get(USER_BASE_URL);
    }
   
    getReviewById(id) {
        return axios.get(USER_BASE_URL+"/"+id)
    }
    getReviewByMovieID(movieID) {
        return axios.get(USER_BASE_URL+"/movie/"+movieID)
    }
    postReview(review) {
        return axios.post(USER_BASE_URL,review)
    }
    getReviewByUserID(userID) {
        return axios.get(USER_BASE_URL+"/user/"+userID)
    }
    getApproveReview() {
        return axios.get(USER_BASE_URL+"/status/2")
    }
    putApproveReview(id, status) {
        return axios.put(USER_BASE_URL+"/status/"+id+"?s="+status)
    }
    like(user,movie) {
        return axios.post(USER_BASE_URL+"/like/"+user+"?s="+movie)
        
    }

    
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ReviewService();