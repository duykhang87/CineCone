import React, { useEffect, useState } from 'react'
import './Register.css'
import { Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import UserService from '../../service/UserService'
import {  useNavigate } from 'react-router-dom';

export default function Register() { 
  const [infor, setinfor] = useState({
    user_name: null,
    user_email: null,
    user_password: null,
    user_bio: null,
    user_avata: null
  })
  const [checkedName, setcheckedName] = useState(false)
  const [checkedEmail, setcheckedEmail] = useState(false)
  const [samePassword,setsamePassword] = useState(true)
  const [repassword, setRepassword] = useState();
  const [checkbox,setCheckBox] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setinfor({ ...infor, [name]: value });
  };
  const handleBlurName = (e) => {
    const {  value } = e.target;
    UserService.checkUserName(value).then((response)=> {
        setcheckedName(response.data)
        if(response.data) {
        toast.error('Tên đăng nhập đã tồn tại', {
          position: 'top-left',
          autoClose: 3000,
      }) }
    })
  }
  const handleBlurEmail = (e) => {
    const {value} = e.target;
    UserService.checkEmail(value).then((response) => {
      setcheckedEmail(response.data)
      if(response.data) {
        toast.error('Emai đã được đăng ký', {
          position: 'top-left',
          autoClose: 3000,
      }) }
    })
  }
  const handleCheckSamePassword = (e) => {
    const {value} = e.target; 
    console.log(value+infor.user_password)
    if(value == infor.user_password) {
      setsamePassword(true);
    } else {
      setsamePassword(false);
      toast.error('Mật khuẩn lập lại không đúng', {
        position: 'top-left',
        autoClose: 3000,
    }) 
    }
  }
  const handleCheckboxChange = (event) => {
    setCheckBox(event.target.checked);
  };
  useEffect(()=>{
    console.log(infor)
  },[infor])
  const handleOnSubmit = (e)=>{
    if (!checkedName && !checkedEmail && samePassword && 
        infor.user_name && infor.user_email && infor.user_password
        && checkbox) {
      console.log(infor)
      UserService.createUser(infor).then((response)=> {
        if(response.data) {
          UserService.getUserById(response.data.user_id).then((user_response)=> {
            localStorage.setItem('user', user_response);
          }) 
          
          navigate("/profile/"+response.data.user_id);
          
          window.location.reload();
        }
      })
    }
    else {
      toast.error('Thông tin chưa hợp lệ', {
        position: 'top-left',
        autoClose: 3000,
    }) 
    }
  }
  return (
    <Row className='reg'>
        <Col md= {10} lg = {6} className='order-2 order-lg-1 d-flex flex-column align-items-center'>
            <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Đăng ký</p>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-user  me-3"></i>
            <input 
              className={`w-100 text-input ${checkedName ? 'redInput' : ''}`}
              type='text' 
              placeholder='nhập username' 
              value={infor.user_name}  
              name="user_name" 
              onChange={handleInputChange}  
              onBlur={handleBlurName}
              onClick={()=>setcheckedName(false)}
              >
              
              </input>
            
            </div>
            {/* <div>
            {checkedName && <p style={{color:'red'}}> tên người dùng đã tồn tại </p>}
            </div> */}
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-envelope me-3"></i>
            <input 
              className={`w-100 text-input ${checkedEmail ? 'redInput' : ''}`}  
              type='text'   
              placeholder='nhập email'
              value={infor.user_email}
              name = 'user_email'
              onChange={handleInputChange}
              onBlur={ handleBlurEmail }
              onClick={()=> setcheckedEmail(false)}></input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-lock me-3"></i>
            <input 
              className={`w-100 text-input ${samePassword ? 'greenInput': 'redInput'}`} 
              type='password' 
              placeholder='nhập mật khẩu'
              value={infor.user_password}
              onChange={handleInputChange}
              name='user_password'></input>
            </div>
            <div className='d-flex flex-row align-items-center mb-4 label'>
            <i class="fa-solid fa-key me-3"></i>
            <input className={`w-100 text-input ${samePassword ? 'greenInput': 'redInput'}`}  
            type='password' 
            placeholder='nhập lại mật khẩu'
            value={repassword}
            onBlur={handleCheckSamePassword}
            name='repassword'></input>
            </div>
            <div className='mb-4'>
              <input type='checkbox' value={checkbox}  onChange={handleCheckboxChange} / > bạn đã đọc và đồng ý với điều khoản sự dụng của diễn đàn
            </div>
            <Button mb= {4} lg= {12} className='btn btn-primary' onClick={handleOnSubmit}>Đăng ký</Button>
        </Col>
        <Col className='order-1 order-lg-2 d-flex align-items-center' md={10} lg = {6} >
        <img src="/logo-dk.png" alt="Logo" />
        </Col>
    </Row>
  )
}
