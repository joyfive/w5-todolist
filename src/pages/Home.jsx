import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
// import Layout from "../components/element/Layout"
import Header from "../components/element/Header";
import Footer from "../components/element/Footer";
import Btn from "../components/element/Btn"
import { IoIosListBox, IoMdCreate  } from "react-icons/io";

const Home = () => {
    const navigate = useNavigate();
    return (
        <Layout>
            <Header />
            <Contents>
                <HomeBox>
                    <Div>
                    <H1>What to do?</H1>
                    
                    <BtnBox>
                    <Btn onClick={() => {
                        navigate("/todoList")
                    }
                    }><IoIosListBox className="icon"/><br />Todo List</Btn>

                    <Btn onClick={() => {
                        navigate("/edit")
                    }}><IoMdCreate className="icon"/><br /> Edit</Btn>
                    </BtnBox>
                    </Div>
                </HomeBox>
            </Contents>
            <Footer />
        </Layout>
    );
};

export default Home;

const H1 = styled.h1`
    font-size: 80px;
    color: #121212;
    text-align: center;
    background-color: transparent;
    @media screen and (max-width: 900px) {
    font-size: 56px;
    }
`

// const Img = styled.div`
//     display: block;
//     width: 95%;
//     height: 350px;

//     `

const Layout = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 1fr;
grid-template-rows: auto;
gap: 0;
/* grid-auto-rows: minmax(40px, auto); */
margin: 0;
padding: 0;

@media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    width: 95%;
}
`;

const Div = styled.div`
    width: 90%;
    height: 70%;
    margin: 20px auto;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
`

const Contents = styled.div`
margin: 0;
width: 100%;
padding: 0;
grid-column: 2 / 3;
grid-row: 2 / 4;


@media screen and (max-width: 900px) {
    grid-column: 1 / 2;
    width: 95%;
}
`;

const HomeBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 15% 20px;
  /* background-color: red; */
  background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)),
  url(https://images.unsplash.com/photo-1532456745301-b2c645d8b80d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
    background-position: center 50%;
    background-size: cover;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  /* box-shadow: 0px 2px 10px #9dabca; */
  @media screen and (max-width: 900px) {
    }
`;

// const Btn = styled.button`
//     display: flex;
//     -webkit-box-align: center;
//     align-items: center;
//     -webkit-box-pack: justify;

//     flex-direction: row;
//     padding: 0px 20px;
//     width: 100%;
//     height: 120px;
//     border: 1px solid rgb(238, 238, 238);
//     background-color: rgb(255, 255, 255);
//     border-radius: 8px;
//     cursor: pointer;
// `

const BtnBox = styled.div `
width: 80%;
margin: 40px auto 0 auto;
    display: flex;
    background-color: transparent;

    .icon {
        background-color: transparent;
        font-size: 2rem;
        
    }
`

