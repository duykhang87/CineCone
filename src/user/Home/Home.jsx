import React, { useState, useEffect} from 'react'
import MovieList from './MovieList/MovieList';
import Post from '../Post/Post';
import './Home.css'
import ReviewService from '../../service/ReviewService';
import MovieService from '../../service/MovieService';


export default function Home() {
  const [movies, setMovies] =useState([]);
 const [top5Movies, setTop5] = useState([])
  const [reviews,setReviews] = useState([]) ;

  useEffect(() => {
    
    ReviewService.getAllReviews().then((response) => {
     setReviews(response.data);  
  });
  MovieService.getAllMovie().then((response) => { 
    setMovies(response.data);
    console.log(response.data)
  });
  MovieService.gettop5().then((response) =>{
    const movieData = response.data.processed_data;
    const ids = movieData.map((m) => m.movie_id)
    console.log(ids)
    const updatedTop5 = [];

    ids.map((id) =>{
      MovieService.getMovieById(id).then((response2) =>{
      updatedTop5.push(response2.data); // Thêm dữ liệu từ phản hồi vào mảng updatedTop5

      setTop5(updatedTop5); 
      })
    })
    console.log(top5Movies)
      
  })
}
,[] );

  return (
       <div className="column home">
      <div className="column column-1 ">
        <h5>Đang thịnh hành</h5>
      <MovieList className="top-5" movies={top5Movies} />
      </div>
      <div className="new-feed" >
      {
          reviews?.map((review) => (
             <Post post={review} > </Post> ))
        }
      </div>
      <div className="column column-3">
        <p>Column 3 - 20%</p>
      </div>
    </div>
  )
}
