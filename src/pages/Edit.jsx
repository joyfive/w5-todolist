import React from 'react';
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";

const Edit = () => {
    return (
        <Layout>
            <Header />
            <Contents>
                <HomeBox>
                    <h1>할일 추가하기</h1>
                    <Form />
                </HomeBox>
            </Contents>
            <Footer />
        </Layout>
    );
};

export default Edit;

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