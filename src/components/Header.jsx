import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <HeadContainer>
      <HeadLeft onClick={()=>{
                      navigate("/")
                    }}>🏠 W4:Todo-list</HeadLeft>
      <HeadRight1>joyfive
      <HeadRight2 onClick={() => window.open('https://github.com/joyfive', '_blank')} className="head-ico">💻</HeadRight2>
      </HeadRight1>
    </HeadContainer>
  );
}
export default Header; 

const HeadContainer = styled.section`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  width: 100%;
  height: 40px;
  background-color: #004d40;
  color: #ffefe0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top:0;
  left: 0;
`
const HeadLeft = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
`

const HeadRight1 = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  align-content: center;
  background-color: transparent;
  `

const HeadRight2 = styled.button`
font-size: 0.9rem;
background-color: #ffefe0;
width: 30px;
height: 30px;
color: #00251a;
border: 0;
border-radius: 50px;
cursor: pointer;
margin: 10px;
font-weight: 600;
`