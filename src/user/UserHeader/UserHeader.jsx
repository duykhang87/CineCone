import React, { useState } from 'react'
import './UserHeader.css'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Row,
} from 'reactstrap';
import UserCard from '../UserCard/UserCard';
import {
 // MdClearAll,
  MdExitToApp,
  // MdHelp,
  // MdInsertChart,
  // MdMessage,
  //MdNotificationsActive,
  //MdNotificationsNone,
  MdPersonPin,
  // MdSettingsApplications,
} from 'react-icons/md';
import SearchInput from './SearchInput';
import MenuHeader from './MenuHeader';

export default function UserHeader() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate(); 
  const logout = (e) => {
    localStorage.removeItem('user');
    navigate('/')
    window.location.reload();

  }
  console.log(user);
  return(
    
    <header className="header">
 
    <Col  xl={2}className="logo">
      <Link to="/">
      {/* Đặt logo của bạn ở đây */}
      <img src="/logoHeader.png" alt="Logo" />
      </Link>
    </Col>
    <Col xl ={6}  > <MenuHeader></MenuHeader></Col>
    <Col xl={3} className="search-bar">
      {/* Đặt thanh tìm kiếm ở đây */}
     <SearchInput />
    </Col>
    <Col xl ={1}>
    {user ? (
      <div className="user-avatar dropdown">
      {/* Đặt hình đại diện của người dùng ở đây */}
      <PopoverBody className="p-0 border-light">
                <UserCard
                  title="Jane"
                  subtitle="jane@jane.com"
                  text="Last updated 3 mins ago"
                  className="border-light"
                >
                 
                </UserCard>
      </PopoverBody>
    
      <div className="dropdown-content">
      <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light" onClick={()=> navigate("/profile/"+user.user_id)}>
                      <MdPersonPin /> Trang cá nhân
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light" onClick={logout}>
                      <MdExitToApp /> Đăng Xuất
                    </ListGroupItem>
                  </ListGroup>
      <Link to={`/profile/${user.user_id}`}>Trang cá nhân</Link>
        <a href="/" onClick={logout}>Đăng xuất</a>
      </div>
    </div>
    ):(
    <div>
         
         <button type="button" class="btn btn-dark" onClick={()=>navigate("/login")}> Đăng nhập </button>
       <button className='btn btn-dark' onClick={()=>navigate("/register")} >ĐĂNG KÝ</button>
       
    </div>
    )}
    </Col>

  

   
  </header>
  )
}
