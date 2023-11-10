import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import "./Post.css"
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import Poster from '../Poster/Poster'
import ReviewService from '../../service/ReviewService';
export default function Post({ post}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [liked, setLiked] = useState(false);
  const [countLiked, setCountLiked] = useState();
  const navigate = useNavigate();
  const handleLikeClick = () => {
    if(user) {
    setLiked(!liked);
    ReviewService.like(user?.user_id,post?.review_id
      ).then((response)=>{
        console.log(response);
        setCountLiked(response.data.likedByUsers?.length)
    })
    } else {
      toast.error('Vui lòng đăng nhập', {
        position: 'top-right',
        autoClose: 3000,
    });
    }
  }
  useEffect(() => {
    post?.likedByUsers.map((likedUser) => {
        if(likedUser.user_id==user?.user_id) {
          setLiked(true);
        }
    })
    setCountLiked(post.likedByUsers?.length)
  }, [post, user]);
 console.log(post)
    
  
  return (
    <div className='post'>
      <Row >
        <Col className='movie' xs={12} md={6} xl ={4}>
       
        <Poster 
        id = {post?.movie?.movie_id}
        title= {post?.movie?.movie_vietnamese_title}
        imageUrl={post?.movie?.movie_id}
        rating={post.review_score?.toFixed(0)}
        banner= {false}
        ></Poster>
        </Col>
        <Col className='review'xs={13} md={6} xl= {8}>
        <Row  onClick={()=>navigate("/profile/"+post.user?.user_id)}>
           
            <Col xs={8} md={8} xl={8}>
              <h1 className='user-name'> {post.user?.user_name} </h1>
              <hr />
            </Col>
            <Col xs={4} md={4} xl={4}>
              <img src={post.user?.user_avat} roundedCircle fluid alt="Avatar" />
            </Col>
          </Row>
          
            <Row className='content italic-text'>
            {post.review_content}
            </Row>
          <Row>
            <Col xl={6} >
          <Button 
             variant={liked ? 'success' : 'outline-secondary'}
            onClick={handleLikeClick}
          >
        {countLiked} {liked ? <i class="fa-solid fa-thumbs-up"></i>: <i class="fa-regular fa-thumbs-up"></i> }
      </Button>
             
            </Col>
            <Col xl ={4} >
            
            </Col>
          </Row>
            
        </Col>
      </Row>
    </div>
  )
}
