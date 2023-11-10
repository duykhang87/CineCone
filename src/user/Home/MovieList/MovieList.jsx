import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./MovieList.css";
import { useNavigate } from 'react-router-dom';
import Poster from '../../Poster/Poster';

const MovieList = ({ movies }) => {
  const navigate = useNavigate(); // Get the navigate function from React Router
  console.log(movies)
  const handleClick = (id) => {
    navigate(`/movie/${id}`); // Use the navigate function to change the route
  };

  return (
    <Container className='poster-list'>
      <Row>
        {movies.map((movie, index) => (
         
            <Poster
            id={movie.movie_id}
            imageUrl ={movie.movie_id}
            title = {movie.movie_vietnamese_title}
            year = {movie.movie_release_date}
            overview = {movie.movie_summary}
            popularity ={"#"+(index+1)}
            ban 
            ></Poster>
       
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
