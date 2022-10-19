import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FootContainer>Copyright 2022. hang-hae99 9th W5: team 2 all rights reserved.</FootContainer>
  )
}

export default Footer

const FootContainer = styled.section`
  grid-column: 1 / 4;
  grid-row: 4 / 5;
  width: 100%;
  height: 36px;
  background-color: #16367d;
  color: white;
  line-height: 2.7;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 300;
  margin: 0;
  position: fixed;
  bottom: 0;
  left: 0;

  @media screen and (max-width: 900px) {
        font-size: 0.7rem;
        line-height: 3.2;
    }
`