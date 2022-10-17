import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const goForm = () => {
    navigate(`/form`)
    console.log(navigate)
  }
  
  const goList = () => {
    navigate('/list')
  }

  return (
    <>
      <Header />
      <div>Home</div>
      <Btn onClick={goForm}>작성하기</Btn>
      <Btn onClick={goList}>할일보기</Btn>
      <Footer />
    </>
    
  )
}

export default Home


const Btn = styled.button`
  margin: 200px 10px;

  width: 200px;
`