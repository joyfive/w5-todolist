import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    const navigate = useNavigate();
    return (
        <Layout>
            <Header />
            <Contents>
                <HomeBox>
                    <h1>What to do? {process.env.REACT_APP_MOD}</h1>

                    <Btn onClick={() => {
                        navigate("/todoList")
                    }}>Todo List</Btn>

                    <Btn onClick={() => {
                        navigate("/edit")
                    }}>Edit</Btn>

                </HomeBox>
            </Contents>
            <Footer />
        </Layout>
    );
};

export default Home;

const Layout = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 1fr;
grid-template-rows: auto;
gap: 0;
/* grid-auto-rows: minmax(40px, auto); */
margin: 0;
padding: 0;
background-color: #ffefe0;

@media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    width: 95%;
}
`;

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
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  height: 40px;
  margin: 40px 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 900px) {
    }
`;

const Btn = styled.button`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    padding: 0px 20px;
    width: 100%;
    height: 120px;
    border: 1px solid rgb(238, 238, 238);
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    cursor: pointer;
`