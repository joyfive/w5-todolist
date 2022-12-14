import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoMdHome, IoLogoGithub } from "react-icons/io";

function Header() {
  const navigate = useNavigate();

  return (
    <HeadContainer>
      <HeadLeft onClick={()=>{
                      navigate("/")
                    }}> <IoMdHome className="head-ico" /> <Div>W5:Todo-list</Div></HeadLeft>
      <HeadRight1><Div>joy&mhh</Div>
      <HeadRight2 onClick={() => window.open('https://github.com/joyfive/w5-todolist', '_blank')} ><IoLogoGithub className="head-ico" /></HeadRight2>
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
  background-color: #2c5cc5;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top:0;
  left: 0;
  box-shadow: 0px 2px 10px #9dabca;
`
const HeadLeft = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  .head-ico {
  font-size: 1.6rem;
  margin: 5px;
  color: white;
  background-color: transparent;
  height: 40px;
}
`

const Div = styled.div`
  background-color: transparent;
  font-weight: 400;
  line-height: 4;
`


const HeadRight1 = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  align-content: center;
  background-color: transparent;
  line-height: 0.2;
  display: flex;
  align-items: center;
  `

const HeadRight2 = styled.button`
font-size: 0.9rem;
width: 30px;
height: 40px;
color: #00251a;
border: 0;
cursor: pointer;
font-weight: 600;
background-color: transparent;
justify-content: center;

.head-ico {
  font-size: 1.6rem;
  margin: 5px;
  color: white;
  background-color: transparent;
}
`