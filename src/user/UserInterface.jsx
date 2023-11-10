import React from 'react'
import UserHeader from './UserHeader/UserHeader'
import UserFooter from './UserFooter/UserFooter'
import { Routes,Route } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Home/Home'
import Profile from './Profile/Profile'
import Actor from './Actor/Actor'
import './UserInterface.css'
import Movie from './Movie/Movie'
import Register from './Register/Register'
import Movies from './Movies/Movies'
// import Content from './layout/Content/Content'

export default function UserInterface({content}) {

  return (
    <div className='user' >
      < UserHeader/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/actors/:id' element={<Actor />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/register' element={<Register />} />
        <Route path='/movies' element = {<Movies />} />
      </Routes>
      < UserFooter />
    </div>
  )
}
