import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeadContainer>
      <HeadLeft>W4:Todo-list</HeadLeft>
      <HeadRight1>joyfive</HeadRight1>
      <HeadRight2 onClick={() => window.open('https://github.com/joyfive', '_blank')} className="head-ico">JOY</HeadRight2>
      
    </HeadContainer>
  );
}
export default Header; 

const HeadContainer = styled.section`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
`
const HeadLeft = styled.a`
  font-size: 0.7rem;
  font-weight: 600;
  width: 86%;
  background-color: #eee;
  align-content: center;
`

const HeadRight1 = styled.a`
  font-size: 0.7rem;
  font-weight: 600;
  width: 7%;
  background-color: #ddd;
  align-content: center;
  `

const HeadRight2 = styled.a`
font-size: 0.7rem;
font-weight: 600;
width: 7%;
background-color: #ccc;
align-content: center;
`