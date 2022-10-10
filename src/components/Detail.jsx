import React from "react";
import styled from "styled-components";
import Footer from './Footer'

const DetailBox = styled.div`
    width: 60%;
    margin: 240px auto 240px auto;
    border: 1px solid #121;
`

const Title = styled.h1`
    font-size: 3rem;
    text-align : center;
    font-weight: 700;
    line-height: 2.0;
`

const Body = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
`

function Todo({ todo }) {

 return (
        <div>
            <DetailBox>
                <Title>${todo.title}</Title>
                <hr />
                <Body>${todo.body}</Body>
            </DetailBox>
            <Footer />
        </div>
      );
    
};
export default Todo;