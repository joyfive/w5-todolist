import React, { useState } from 'react';
// import { Counter } from './features/counter/Counter';
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import Header from "../components/header/Header";
import Form from "../components/form/Form";
import List from "../components/list/List";


const TodoList = () => {
    const [todos, setTodos] = useState([
        {
           id: 1,
           title: "노마드코더 강의듣기",
           body: "Redux 101 강의를 들어봅시다!",
           isDone: true,
         },
         {
           id: 2,
           title: "html&css 작업하기",
           body: "칸반보드 스타일로 css를 연습해보자!",
           isDone: true,
         },
         {
           id: 3,
           title: "기능 구현하기",
           body: "각 컴포넌트의 기능을 Redux를 도입해서 리팩토링 해보자!",
           isDone: false,
         },
       ]);

       const Layout = styled.div`
       display: grid;
       grid-template-columns: 1fr 3fr 1fr;
       grid-template-rows: 0.3fr 1fr 1fr 1fr 0.2fr;
       margin: 0;
       padding: 0;
   `;

       return (
        <div>
        <Layout>
          <Header />
          <Form setTodos={setTodos} todos={todos} />
          <List todos={todos} setTodos={setTodos} />
        </Layout>
        </div>
      );
    };
    
    export default TodoList;
    

