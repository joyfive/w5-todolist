import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FootContainer>Copyright 2022. hang-hae99 9th joyfive. all rights reserved.</FootContainer>
  )
}

export default Footer

const FootContainer = styled.section`
  grid-column: 1 / 4;
  grid-row: 4 / 5;
  width: 100%;
  height: 30px;
  background-color: #e2d3c4;
  color: #00251a;
  line-height: 2.5;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
`