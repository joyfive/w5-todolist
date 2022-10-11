import React from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import Form from "../components/Form";
import List from "../components/List";
import Footer from "../components/Footer";


const TodoList = () => {

       return (
        <div>
        <Layout>
          <Header />
          <Contents>
          <Form />
          <List />
          </Contents>
          <Footer />
        </Layout>
        </div>
      );
    };
    
    export default TodoList;
    

    const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-auto-rows: minmax(40px, auto);
    margin: 0;
    padding: 0;
    `;
    
    const Contents = styled.div`
    margin: 80px 0 80px 0;
    padding: 0;
    `;
    