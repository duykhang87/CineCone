import React, { useState } from 'react'
import './AdminHeader.css'
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const logout = (e) => {
    localStorage.removeItem('user');
  }
  console.log(user);
  return(
    
    <header className="header">
    <div className="logo">
      <Link to="/">
      {/* Đặt logo của bạn ở đây */}
      <img src="/logoHeader.png" alt="Logo" />
      </Link>
    </div>
    <div className="search-bar">
      {/* Đặt thanh tìm kiếm ở đây */}
      <input type="text" placeholder="Tìm kiếm..." />
    </div>
    {user ? (
      <div className="user-avatar dropdown">
      {/* Đặt hình đại diện của người dùng ở đây */}
      <img src="user-avatar.png" alt="User Avatar" />
      <h1> {user.user_name}</h1>
      <div className="dropdown-content">
      <Link to={`/profile/${user.user_id}`}>Trang cá nhân</Link>
        <a href="/" onClick={logout}>Đăng xuất</a>
      </div>
    </div>
    ):(
    <div>
    </div>
    )}
  </header>
  )
}
