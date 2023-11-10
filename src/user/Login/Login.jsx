import React from 'react';
import { useState } from 'react';
import './Login.css';
import UserService from '../../service/UserService'
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../service/AdminService';


export default function Login() {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    let userDetail = {
      user_name: user.username,
      user_password: user.password
    };
    let adminDetail = {
      admin_name: user.username,
      admin_password: user.password
    };
    console.log(userDetail);
    UserService.login(userDetail).then((response) => {
      console.log(response.data);
      let nowUser = response.data;
      localStorage.clear();
      // Save 'nowUser' in 'localStorage'
      if( nowUser.user_id) {
      localStorage.setItem('user', JSON.stringify(nowUser));
      navigate("/");
      window.location.reload();
      }})
    .catch((error) => {
      AdminService.login(adminDetail).then((response)=> {
        let adminNow = response.data;
        localStorage.clear();
        if(adminNow.admin_id) {
          localStorage.setItem('admin',JSON.stringify(adminNow));
          navigate("/admin");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng nhập:', error);
        toast.error('Tên đăng nhập hoặc mật khẩu không chính xác', {
          position: 'top-right',
          autoClose: 3000,
      });

     
      });
    });

  };
  

  return (
    <div className="container">
 
      <div className="row">
        {/* Phần 1 */}
        <div className="col-md-6 login-banner">
          {/* Bạn có thể thêm nội dung hoặc hình ảnh cho phần này */}
        </div>

        {/* Phần 2 */}
        <div className="col-md-6 login-form">
          <h1 className="form-title">Đăng nhập</h1>
          <form  className= " login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="user_name">Tên Đăng nhập</label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="user_name"
                placeholder="Tên Đăng nhập"
                value={user.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật Khẩu</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Mật Khẩu"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <p>Bạn chưa có tài khoản, tham gia cùng chúng tôi <a href="/register"> tại đây </a></p>
            <button type="submit" className="btn btn-primary">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
