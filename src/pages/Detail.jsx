import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getID, __updateContent } from "../redux/modules/todos.js";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Comment from "../components/Comment";

const Detail = () => {
  const dispatch = useDispatch();
  const todoItem = useSelector((state) => state.todos.todo);
  const { id } = useParams();
  const navigate = useNavigate();

  const [mod, setMod] = useState(false);

  const [updatedTodo, setUpdatedTodo] = useState("");

  useEffect(() => {
    dispatch(__getID(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    setUpdatedTodo(todoItem.body);
  }, [todoItem]);

  const isUpdate = () => {
    mod ? setMod(false) : setMod(true);
  }

  return (
    <Layout>
      <Header />
      <DetailWrap>
        <DetailBox>
          <TitBox>
            <Title>{todoItem.title}</Title>
            <Id>ID : {todoItem.id}</Id>
          </TitBox>
          {!mod ?
            <Body>{todoItem.body}</Body>
            :
            <ModBody
              name="body"
              rows="10"
              maxLength={200}
              value={updatedTodo}
              onChange={(event) => {
                setUpdatedTodo(event.target.value);
              }} />

          }
          <BtnBox>
            {!mod ?
              <BtnReturn
                onClick={() => {
                  navigate("/todoList")
                }}>
                이전으로
              </BtnReturn>
              :
              <BtnReturn onClick={isUpdate}>수정취소</BtnReturn>
            }
            {!mod ?
              <BtnReturn onClick={isUpdate}>수정하기</BtnReturn>
              :
              <BtnReturn
                onClick={() => {
                  const obj = {
                    ...todoItem,
                    body: updatedTodo
                  }
                  dispatch(__updateContent(obj));
                  isUpdate();
                }}>
                저장하기
              </BtnReturn>
            }
          </BtnBox>
        </DetailBox>
        <Comment detailConId={todoItem.id} />
      </DetailWrap>
      <Footer />
    </Layout>
  );

};

export default Detail;

const BtnBox = styled.div`
  display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:24px;
`

const Layout = styled.div`
    display: block;
    width: 100%;
    height: 100vh;
    background-color: #ffefe0;
    margin: 0;
    padding: 0;
    
`;
const DetailWrap = styled.div`
  width: 100%;
  display : flex;
  flex-direction : row;
`

const DetailBox = styled.div`
    width: 95%;
    max-width: 400px;
    margin: 15% auto 10% auto;
    border: 1px solid #ccc0ae;
    background-color: #aebfbe;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 900px) {
        margin-top: 35%;
    }
`;

const TitBox = styled.section`
    padding: 0 15px;
    height: 80px;
    background-color: #004d40;
    color: #ffefe0;
    
    
`;

const Title = styled.h1`
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 0.6;
    background-color: transparent;
    @media screen and (max-width: 900px) {
        font-size: 1.4rem;
        line-height: 0.7;
    }
`;

const Id = styled.p`
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 0.3;
    background-color: transparent;

    div {
      background-color: transparent;
    }
    @media screen and (max-width: 900px) {
        font-size: 0.7rem;
    }
`;

const Body = styled.p`
    font-size: 0.9rem;
    line-height: 1.6;
    padding: 0 20px;
    color: #004d40;
    height: 100%;
    min-height: 240px;
    background-color: transparent;
    width:80%;
`;

const ModBody = styled.textarea`
  font-size: 0.9rem;
    line-height: 1.6;
    padding: 0 20px;
    color: #004d40;
    height: 100%;
    min-height: 240px;
    background-color: transparent;
`

const BtnReturn = styled.button`
  padding: 10;
  width: 100%;
  margin: 20px 10px;
  align-self: center;
  height: 32px;
  color: #39796b;
  font-weight: 600;
  font-size: 0.7rem;
  line-height: 1;
  border: 1px solid #39796b;
  background-color: transparent;
  font-family: 'IBM Plex Sans KR', sans-serif;
  cursor: pointer;
&:hover {
  background-color: #39796b;
  color: white;
}
`