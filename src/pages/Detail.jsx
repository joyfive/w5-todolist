import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getID, __updateContent } from "../redux/modules/todos.js";

// import Layout from "../components/Layout";
import Header from "../components/element/Header";
import Footer from "../components/element/Footer";
import Comment from "../components/Comment";
import Btn from "../components/element/Btn"

const Detail = () => {
  const dispatch = useDispatch();
  const todoItem = useSelector((state) => state.todos.todo);
  const { id } = useParams();
  const navigate = useNavigate();

  const [mod, setMod] = useState(false);
  const [useIsDisplay, setUseIsDisplay] = useState("none");
  const [updatedTodo, setUpdatedTodo] = useState("");

  const commentTogle = () => {
    useIsDisplay === "none" ? setUseIsDisplay("block") : setUseIsDisplay("none");
}

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
    <>
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
              <Btn
                onClick={() => {
                  navigate("/todoList")
                }}>
                이전으로
              </Btn>
              :
              <Btn onClick={isUpdate}>수정취소</Btn>
            }
            {!mod ?
              <Btn onClick={isUpdate}>수정하기</Btn>
              :
              <Btn
                onClick={() => {
                  const obj = {
                    ...todoItem,
                    body: updatedTodo
                  }
                  dispatch(__updateContent(obj));
                  isUpdate();
                }}>
                저장하기
              </Btn>
            }
          </BtnBox>
        </DetailBox>
      </DetailWrap>
      <Footer />
      <Cmt isDisplay={useIsDisplay}>
    <Comment detailConId={todoItem.id}/>
    </Cmt>
      <BtnWrap>
    <Btn size="round" color="reverse" onClick={commentTogle}>댓글</Btn>
    </BtnWrap>

    </>
  );

};

export default Detail;

const BtnBox = styled.div`
  display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:20px;
    margin: 20px 20px;
    background-color: transparent;
`

const DetailWrap = styled.div`
  width: 100%;
  display : flex;
  flex-direction : row;
`

const DetailBox = styled.div`
    width: 95%;
    max-width: 400px;
    margin: 15% auto 10% auto;
    border: 0;
    border-radius: 20px;
    box-shadow: 0px 2px 10px #9dabca;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 900px) {
        margin-top: 35%;
    }
`;

const TitBox = styled.section`
    padding: 0 20px;
    height: 80px;
    background-color: #2c5cc5;
    color: #fff;
    border-radius: 20px 20px 0 0;
    
    
`;

const Title = styled.h1`
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 0.6;
    background-color: transparent;
    word-break: break-all;
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
    line-height: 0.2;
    margin-bottom: 20px;
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
    color: #121212;
    height: 100%;
    min-height: 240px;
    background-color: transparent;
    width:80%;

  word-break: break-all;
`;

const ModBody = styled.textarea`
  font-size: 0.9rem;
  line-height: 1.6;
  padding: 20px;
  color: #2c5cc5;
  height: 100%;
  min-height: 240px;
  background-color: transparent;
  border: 0;
`

const Cmt = styled.div`
  display : ${(props) => props.isDisplay};
`

const BtnWrap = styled.div`
  position: fixed;
  bottom : 60px;
  right: 10px;
  background-color: transparent;
`

// const Btn = styled.button`
//   padding: 10;
//   width: 100%;
//   margin: 20px 10px;
//   align-self: center;
//   height: 32px;
//   color: #39796b;
//   font-weight: 600;
//   font-size: 0.7rem;
//   line-height: 1;
//   border: 1px solid #39796b;
//   background-color: transparent;
//   font-family: 'IBM Plex Sans KR', sans-serif;
//   cursor: pointer;
// &:hover {
//   background-color: #39796b;
//   color: white;
// }
// `