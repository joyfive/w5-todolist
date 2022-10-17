import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getIdThunk, updateTodoThunk } from "../redux/modules/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Detail = () => {
  const dispatch = useDispatch();
  const todoItem = useSelector((state) => state.todos.todo);
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    body: "",
  });
  
  const [bodyError, setBodyError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setTodo({ 
      ...todo, 
      [name]: value,
      isEdit: true
    });
};

//221018 구현예정
// (Done)1. [수정하기] 버튼 클릭 시 - isEdit : false => true
// 2. isEdit:true 일 때, 수정 폼 노출
// 3. 수정 폼에서 [저장하기] 버튼 클릭 시 - 입력데이터 body value에 저장 + isEdit : true => false

  const onEdit = (event) => {
    dispatch(
    setTodo({
      isEdit: true
    })  
  )};

  useEffect(() => {
    dispatch(getIdThunk(id));
  }, [dispatch, id]);

  const validateForm = () => {
    setBodyError('');
    let validated = true;

    if (!todo.body) {
      setBodyError('수정할 내용을 입력해주세요.');
      validated = false;
    }
    return validated;
  }


  const onSubmit = (event) => {
      event.preventDefault();
      if (validateForm()) {
        if (todo.body.trim() === "") 
        return;
        axios.patch(`http://localhost:3001/todos/${todoItem.id}`, todo);
        dispatch(
          updateTodoThunk({ id: Date.now()+Math.random(), ...todo }),
          todoItem['isEdit'] = false
        )
  };
}

 return (
        <Layout>
            <Header />
            <DetailBox>
              <TitBox>
                <Title>{todoItem.title}</Title>
                <Id>
                  <div>Writer : {todoItem.writer}</div>
                  <div> POST ID : {todoItem.id}</div>
                </Id>
              </TitBox>
                <Body
                >
                  <Textbox display={!todo.isEdit ? "block" : "none"}>
                    {todoItem.body}
                  </Textbox> 
                <EditForm>
                <BodyEdit type="submit" id="bodyEdit" onChange={onChange} display={todo.isEdit ? "block" : "none"}></BodyEdit>
                <BtnEdit type="submit" form="bodyEdit" onSubmit={onSubmit} display={todo.isEdit ? "block" : "none"}>저장하기</BtnEdit>
                </EditForm> </Body>
                <Btnbottom>
                <Valitext>{bodyError}</Valitext>
                <BtnReturn
                    onClick={onEdit}
                >
                  수정하기
                  </BtnReturn>
                  <BtnReturn
                    onClick={()=>{
                      navigate("/list")
                    }}
                >
                  돌아가기
                </BtnReturn>
                </Btnbottom>
            </DetailBox>
            <Footer />
        </Layout>
      );
    
};

export default Detail;

const Layout = styled.div`
    display: block;
    width: 100%;
    height: 100vh;
    background-color: #ffefe0;
    margin: 0;
    padding: 0;
    
`;

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
`;

const Btnbottom = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
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

const BodyEdit = styled.textarea`
  background-color: white;
  border-radius: 10px;
  width: 90%;
  height: 160px;
  margin: 20px auto 10px auto;
  padding: 5%;
  font-size: 0.8rem;
  display: ${props => props.display || "block"};
`

const BtnEdit = styled.button`
  border: 1px solid #004d40;
  background-color: #39796b;
  padding: 5px 80px;
  text-align: center;
  margin: 0 auto;
  color: #ffefe0;
  display: ${props => props.display || "block"};
`

const Textbox = styled.div`
  background-color: transparent;
  color: #004d40;
  display: ${props => props.display || "block"};
`

const Valitext = styled.div`
width: 100%;
margin-left: 10px;
padding: 0px;
font-size: 0.7rem;
color: red;
`

const EditForm = styled.div`
  background-color: transparent;
`