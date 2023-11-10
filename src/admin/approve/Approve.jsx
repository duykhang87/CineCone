import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReviewService from '../../service/ReviewService';
import './Approve.css';
import { toast } from 'react-toastify';

export default function Approve() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ReviewService.getApproveReview().then((response) => {
        setReviews(response.data)
        })},[]);

    useEffect(() => {
      console.log(reviews);
    }, [reviews]);
    const handleAgreebtn = (id,s) => {
        ReviewService.putApproveReview(id,s).then((response) => {
            if (response.data.review_id) {
                toast.info('Đã được duyệt review của '  +response.data.user.user_name , {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            
        })
        }
    return (
        <div>
        {reviews[0] ? reviews.map((review) => (
        <Col className='a-post'>
          <Row key={review.id}>
            <p>
              <span className='h5'>{review.user?.user_name} </span> đã cho {review.review_score}{' '}
              <i className='fa-solid fa-star' style={{ color: 'yellow', display: 'inline' }}></i> cho bộ phim{' '}
              <b>{review.movie?.movie_vietnamese_title}</b>
            </p>
            <p className='text-muted'>{review.review_time}</p>
          </Row>
           <Row>
           {review.review_content}
         </Row>
         
         <Row className='action'>
           <Col className='text-success' onClick={()=>handleAgreebtn(review.review_id,1)}> <i class="fa-solid fa-check"></i> Phê Duyệt</Col>
           <Col className='text-warning' onClick={()=>handleAgreebtn(review.review_id,4)}> <i class="fa-solid fa-pen-to-square"></i> Yêu Cần Chỉnh sửa</Col>
           <Col className='text-danger' onClick={()=>handleAgreebtn(review.review_id,3)}> <i class="fa-solid fa-circle-xmark"></i> Từ chối</Col>
         </Row>
      
         </Col> 
        )) : <Col className='a-post' style={{ color: 'black'}}><h3>Không có bài đăng nào</h3></Col>
      }
       </div>
      
    );
  
}
