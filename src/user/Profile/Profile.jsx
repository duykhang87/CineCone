import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../service/UserService';
import './Profile.css';
import ReviewService from '../../service/ReviewService';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Post from '../Post/Post';
import { toast } from 'react-toastify';
import styled from "styled-components";
const ProfileDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

const ProfileImage = styled.img`
  max-width: 130px;
  border: 1px solid #919191;
  border-radius: 50%;
  padding: 4px;
  flex-basis: 40%;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 60%;
`;

const StatsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatsNumber = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

const StatsLabel = styled.span`
  margin-top: 5px;
  text-transform: capitalize;
  letter-spacing: 1px;
  font-size: 14px;
`;
export default function Profile() {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [userData, setUserData] = useState({});
  const [review, setReview] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [followings, setFollowings] = useState();
  const [editor, setEditor] = useState(false);
  const [avata,setAvata] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData)
  };

  useEffect(() => {
    UserService.getUserById(id)?.then((response) => {
      setUserData(response.data);
    });
    ReviewService.getReviewByUserID(id)?.then((response) => {
      setReview(response.data);
    });
  }, [id]);
  
  
  useEffect(() => {
    if (userData.followers) {
      setFollowers(userData.followers.length);
    }
    if(userData.followering) {
      setFollowings(userData.followering.length);
    }

  }, [userData]);
  const handleChangeImg = (e) => {
    setAvata(URL.createObjectURL(e.target.files[0]));
  }
  const handleSumit = (e) => {
    console.log(userData)
    let data = {
      user_bio: userData.user_bio
    }
    UserService.updatebio(id, data).then((response)=>{
        toast.info('Nội dung đã được cập nhật', {
          position: 'top-right',
          autoClose: 3000,
      });
      setEditor(false);
      
    })
  }
  const handleCLoseEdit = () => {
    setEditor(false) 
    UserService.getUserById(id)?.then((response) => {
      setUserData(response.data);
    });
  }
  

  return (
    <div className='profile'>
    <Row >
      <Col lg={2}>
        <label  className="file-label" style={{ backgroundImage: `url(${avata})` }}>
        </label>
      </Col>
      <Col lg ={10}>
        <h2>{userData.user_name}</h2>
        {userData.user_id==user?.user_id ? (
              <Col> 
                <button className='btn btn-success' onClick={() => setEditor(true)}> Chỉnh sữa trang cá nhân </button>
              </Col>
            ):(
              <Col> 
                <button>Theo dỗi</button>
              </Col>
              )}
        <div className="text-muted">{userData.user_bio}</div>
        <Row>
          <ProfileStats>
        <StatsBlock>
          <StatsNumber>{followers}</StatsNumber>
          <StatsLabel>người theo dõi</StatsLabel>
        </StatsBlock>
        <StatsBlock>
          <StatsNumber>{review?.length}</StatsNumber>
          <StatsLabel> bài đánh giá</StatsLabel>
        </StatsBlock>
        <StatsBlock>
          <StatsNumber>332</StatsNumber>
          <StatsLabel>following</StatsLabel>
        </StatsBlock>
      </ProfileStats>
         
        </Row>   
      </Col>
   
    </Row>
    <Row>Tủ phim</Row> 
    <Row className='movie-review'>
        <h1 className='center '>CÁC ĐÁNH GIÁ</h1>
        {
          review?.map((review) => (
             <Post post={review} > </Post> ))
        }
    </Row>
    {editor && <Row className='edit'>
        <Form>
        <button type="button" class="btn btn-danger" onClick={ handleCLoseEdit}>X</button>
        <h2 className='edit-title'> Chỉnh sửa thông tin</h2>
        <input
          type="file"
          id='img-input'
          className="img-input"
          onChange={handleChangeImg}
        />
         <h5>Thay đổi ảnh đại diện</h5>
        <div className='d-flex justify-content-center'>
       
        <label htmlFor="img-input" className="file-label" style={{ backgroundImage: `url(${avata})` }}>
          <span>+</span>
        </label>
        
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='h5'>Tiểu sử của tui</Form.Label>
                 <Form.Control 
                  className='edit-bio' 
                  type='text'
                  name = 'user_bio' 
                  placeholder="nhập tiểu sử của bạn"  
                  value={userData.user_bio}
                  style={{ border: 'none',textAlign: 'center' }}
                  onChange={handleInputChange}
                 />
           </Form.Group>
           <Form.Group className="mb-3">
        <Form.Label className='h5'>Tên đăng nhập của tui</Form.Label>
            <Form.Control placeholder="Disabled input" disabled  value={user.user_name} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='h5'>Địa chỉEmail</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  disabled  value={user.user_email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSumit}>
        Xác nhận
      </Button>
        </Form>
     </Row> }
  </div>
        


  );
}
