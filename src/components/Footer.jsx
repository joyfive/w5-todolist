import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FootContainer>Footer</FootContainer>
  )
}

export default Footer

const FootContainer = styled.section`
  grid-column: 1 / 4;
  grid-row: 4 / 5;
  width: 100%;
  height: 30px;
  text-align: center;
  margin-top: 120px;
  background-color: #e3e3e3;
  
`