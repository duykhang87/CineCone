import React from 'react'
import AdminHeader from './Admin-Header/AdminHeader'
import LeftNavBar from './NavBar/LeftNavBar'
import { Route, Routes } from 'react-router-dom'
import Statistical from './thongke/Statistical'
import './Admin.css'
import Approve from './approve/Approve'
import AMovie from './A-Movie/AMovie'
import EditMoive from './A-Movie/EditMovie/EditMovie'

export default function AdminInterface() {
  return (
    <div>
      <AdminHeader / >
      <LeftNavBar />
      <div className='a-body' >
      <Routes>
        <Route path='/statistic' element=  {<Statistical/>} ></Route>
        <Route path='/approve' element=  {<Approve/>} ></Route>
        <Route path='/movie' element=  {<AMovie/>} ></Route>
        <Route path='/movie/edit/:id' element= {<EditMoive/>} ></Route>
      </Routes>
      </div>
    </div>
  )
}
