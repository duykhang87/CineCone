import React from 'react'
import { Col, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
export default function MenuHeader() {
    const navigate = useNavigate(); 
  return (
        <Row>
            <Col xl= {4} onClick={()=>navigate("/")}> <i class="fa-solid fa-house"></i> Home </Col>
            <Col xl= {4} onClick={()=>navigate("/movies")} >  <i class="fa-solid fa-clapperboard"></i> Phim</Col>
            <Col xl= {4}>  <i class="fa-solid fa-clapperboard"></i> Tin Tức</Col>
        </Row>
  )
}
