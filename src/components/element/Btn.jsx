import React from 'react'
import styled, { css } from 'styled-components'

const Btn = (props) => {
  return (
    <StButton {...props} disabled={props.disabled}>
      {props.children}
    </StButton>
  );
}

export default Btn;

const StButton = styled.button`
  padding: 10px;
  width: 100%;
  margin: 5px 5px;
  align-self: center;
  height: 100%;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.6;
  border: 0;
  color: #2c5cc5;
  border-radius: 10px;
  box-shadow: 0px 2px 10px #9dabca;
  background-color: white;
  font-family: 'IBM Plex Sans KR', sans-serif;
  cursor: pointer;

&:hover {
  background-color: #2c5cc5;
  border: 0;
  color: white;
}


${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 100%;
        `;
      case "double":
        return css`
          width: 40%;
        `;
      case "small":
        return css`
          width: 30px;
          height: 30px !important;
          padding: 5px;
        `;
      case "round":
        return css `
        width: 100px;
        height: 100px !important;
        padding: 20px;
        border-radius: 50px; 
        `;

      default:
      return css`
        width: 100%;
      `;

    }
  }
}



${({ color }) => {
  switch (color) {

    case "reverse":
      return css`
          color: white;
          background-color: #2c5cc5;

        &:hover {
          background-color: white;
          border: 0;
          color: #2c5cc5;
      
      }
      `

    default:
      return css`
          color: #2c5cc5;
          background-color: white;

        &:hover {
          background-color: #2c5cc5;
          border: 0;
          color: white;
      
      }
      `
}
}
}
`

// background-color: ${({ bgColor, disabled }) => (disabled ? "#39796b" : bgColor)};

// ${({ size }) => {
//   switch (size) {
//     case "large":
//       return css`
//         width: 100%;
//       `;
//     case "medium":
//       return css`
//         width: 80px;
//       `;
//     case "small":
//       return css`
//         width: 30px;
//         height: 30px !important;
//       `;
//     default:
//       return css`
//         width: 120px;
//       `;
//   }
// }}