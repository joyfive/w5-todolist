import React from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import Form from "../components/Form";
import List from "../components/List";
import Footer from "../components/Footer";


const TodoList = () => {

       return (
        <Layout>
          <Header />
          <Contents>
          <Form />
          <List />
          </Contents>
          <Footer />
        </Layout>
      );
    };
    
    export default TodoList;
    

    const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: repeat(4, auto);
    gap: 0;
    /* grid-auto-rows: minmax(40px, auto); */
    margin: 0;
    padding: 0;
    background-color: #fff3e0;
    `;
    
    const Contents = styled.div`
    margin: 0;
    width: 100%;
    padding: 0;
    grid-column: 2 / 3;
    grid-row: 2 / 4;
    `;
