import React, { useState, useEffect } from 'react';
import './Movie.css';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import YouTubeVideo from './YouTubeVideo/YouTubeVideo';
import MovieService from '../../service/MovieService';
import ReviewService from '../../service/ReviewService';
import Post from '../Post/Post';
import { format, parse } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Movie() {
  const { id } = useParams();
  const user =  JSON.parse(localStorage.getItem('user') || null);
  const [isform, setIsform] = useState(false);
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState({})
  const [reviews, setReviews] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [content, setContent] = useState([]);
  const [avgrating, setAvgrating] = useState();
    useEffect(() => {
    MovieService.getMovieById(id)?.then((response) => {
      setMovie(response.data);
    });
    ReviewService.getReviewByMovieID(id)?.then((response) => {
     setReviews(response.data); 
    });
     
  }, [id]);
  useEffect(() => {
    let sum = 0;
    let n = 0;
  
    reviews.forEach((review) => {
      if (review.review_status !==3) {
        n++;
        sum += review.review_score;
      }
    });
  
    setAvgrating(n > 0 ? sum / n : "Chưa có đánh giá nào");
  }, [reviews]);
  const convertDateFormat = (inputDateString) => {
    const inputFormat = "HH:mm:ss dd/MM/yyyy";
    const outputFormat = "yyyy-MM-dd";
    const date = parse(inputDateString, inputFormat, new Date());
    return format(date, outputFormat);
  }

  const handleButtonClick = () => {
   setIsform(true);
  };
  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
    console.log(starIndex) // Cộng 1 để biểu thị 1 đến 10 điểm
  };
  const handleCloseBtn = () => {
    setIsform(false);
  }

  
  const handleSubmit = () => {
    const newReview = {
      movie_id: movie.movie_id,
      user_id: user.user_id,
      review_time: convertDateFormat(currentTime.toLocaleString()),
      review_score: rating,
      //review_status: 2,
      review_content: content
    };
    ReviewService.postReview(newReview).then((response)=>{
        setIsform(false);
        MovieService.getMovieById(id)?.then((response) => {
          setMovie(response.data);
        });
        ReviewService.getReviewByMovieID(id)?.then((response) => {
         setReviews(response.data); 
        });
         
      console.log("Đã thêm đánh giá thành công:", response.data);
      toast.success("Đã thêm đánh giá thành công", {
        position: "top-right",
        autoClose: 3000, // Thời gian hiển thị thông báo (3 giây)
      });

    })
    .catch((error) => {
      console.error("Lỗi khi thêm đánh giá:", error);
      toast.error("Lỗi khi thêm đánh giá", {
        position: "top-right",
        autoClose: 3000, // Thời gian hiển thị thông báo (3 giây)
      });
    });
  }
  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
  }
  const firstType = (types) => {
    if (types && types.length > 0) {
      return types[0].type_name;
    }
    return "";
  }
  const firstdirector = (directors) => {
    if (directors && directors.length > 0) {
      return directors[0].actor_name;
    }
    return "";
  }
  return (
    <div className='movie-page'>
      <Row className="info">
        <Col className='movie-poster' lg={3}>
          <img src={`/poster/${movie.movie_id}.jpeg`} alt={movie.movie_vietnamese_title} />
          
        </Col>
        <Col className='cc' lg={6}>
          <button> {movie.ageLimit?.limit_name}</button><h4 className='mb-0'>{movie.movie_vietnamese_title}</h4>
          <div className="text-muted">{movie.movie_english_title}</div>
          <div className='summary'>{movie.movie_summary}</div>
          <Row className='number-rank'>
            <Col className=' redbox'>
              <p>Điểm trung bình</p>
              {avgrating}
            </Col>
            <Col className=' redbox'>
              <p>Độ dài phim</p> 
              {movie.lenght} phút
            </Col>
            <Col className='redbox'>
              <p>Ngày khởi chiếu</p>
              {movie.movie_release_date}
            </Col>
          </Row>
        </Col>
        <Col className='cast' lg={2}>
          <div>Đạo diễn: <span className='redText'>{firstdirector(movie.directors)} 
            {movie.directors?.length > 1 &&
                    movie.directors.slice(1).map((director, index) => (
                  <span key={index}>,&nbsp;{director.actor_name}</span>
              ))}</span></div>
          {/* <div>Diễn viên: {movie.cast.map((actor, index) => (
       
            <span key={index} className='redText'> {actor.name}</span>
           
          ))}
          </div> */}
          <div> Thể Loại: <span className='redText'> {firstType(movie.types)} 
            {movie.types?.length > 1 &&
                    movie.types.slice(1).map((type, index) => (
                  <span key={index}>,&nbsp;{type.type_name}</span>
              ))} </span> </div> 
          <Col className='danh-gia'> 
          <button type="button" class="btn btn-outline-danger"><i class="fa-regular fa-heart"></i></button>
          <button className='btn btn-primary' onClick={handleButtonClick}>Đánh giá </button></Col>
        </Col>
      </Row>
      <Row >
            {isform && 
            <div className='form-post'>
              <button  className='btn btn-danger cancer-btn' onClick={ handleCloseBtn}> X</button>
              <Row>
              <Col lg={6}>
              <h4> Đánh giá phim {movie.movie_vietnamese_title} </h4>
              {[...Array(10)].map((_, index) => (
              <span
                key={index}
                 className={`star ${index < rating ? 'active' : ''}`}
                onClick={() => handleStarClick(index)}
              >
                &#9733;
              </span>
              ))}
              <h1> </h1>
              <textarea className='post-input' value={content}  onChange={handleContentChange}></textarea>
              <button className='btn btn-primary' onClick={handleSubmit}>Đăng</button>
              </Col>
              <Col className='movie-poster' lg={3}>
                <img src={`/poster/${id}.jpeg`} alt={movie.movie_vietnamese_title} />

              </Col>
              </Row>
              </div>}
      </Row>
      <Row className='body'>
        <Col lg={6} className='trl'>
        <YouTubeVideo videoId={movie.movie_trailer_ulr} />
        </Col>
        <Col className='tong-diem' lg = {6}>
          Phim {movie.movie_vietnamese_title} được 548 đánh giá trong đó
          54% đánh giá phim hay 
        </Col>
        {/* Add content for the body section here */}
      
      </Row>
      <Row className='movie-review'>
        <h1 className='center '>CÁC ĐÁNH GIÁ</h1>
        {
          reviews?.map((review) => (
            
            (review.review_status!==3) ?
             <Post post={review} > </Post> : null))
        }
      </Row>
    </div>
  );
}
