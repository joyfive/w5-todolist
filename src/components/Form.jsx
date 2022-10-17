import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTodoThunk } from '../redux/modules/todosSlice';
import axios from "axios"; 
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';




const Form = () => {
    const dispatch = useDispatch();
    const isSuccess = useSelector((state) => state.todos.isSuccess);
    const [writerError, setWriterError] = useState('');
    const [titError, setTitError] = useState('');
    const [bodyError, setBodyError] = useState('');

    const navigate = useNavigate();

    const onList = () => {
      navigate(`/list`)
    }
    

    const [todo, setTodo] = useState({
      title: "",
      body: "",
      writer: "",
    });

    useEffect(() => {
      if (!isSuccess) return;
      if (isSuccess) 
      return (onReset, todo) => dispatch(onReset(todo));
    }, [dispatch, isSuccess]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setTodo({ 
          ...todo, 
          id: Date.now() + Math.random(),
          [name]: value,
          isDone: false, });
    };

    const onReset = (e) => {
        setTodo({
        writer: "",
        title: "",
        body: "",
        });
        resetErrors();
    };
    
    const validateForm = () => {
      resetErrors();
      let validated = true;
      if (!todo.writer) {
        setWriterError('작성자를 입력해주세요.')
        validated = false;
      }
      if (!todo.title) {
        setTitError('제목을 입력해주세요.');
        validated = false;
      }
      if (!todo.body) {
        setBodyError('내용을 입력해주세요.');
        validated = false;
      }
      return validated;
    }


    const onSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
          if (todo.title.trim() === "" || todo.body.trim() === "") 
          return;
          
          axios.post("http://localhost:3001/todos", todo);
          dispatch(
            addTodoThunk({ id: Date.now()+Math.random(), ...todo }),
            onReset(),
            onList()
            )
    };
  }

    const resetErrors = () => {
      setWriterError('')
      setTitError('');
      setBodyError('');
    }

  return (
    <FormBox onSubmit={onSubmit} id="add">
      <InputContainer>
          <InputVali>
            <InputBox
              type="text"
              name="writer"
              value={todo.writer}
              onChange={onChange}
              placeholder='작성자명 (5자 이내)'
              maxLength={5}
            />
            <Valitext>{writerError}</Valitext>
          </InputVali>
          <InputVali>
            <InputBox
              type="text"
              name="title"
              value={todo.title}
              onChange={onChange}
              placeholder='제목 (30자 이내)'
              maxLength={30}
            />
            <Valitext>{titError}</Valitext>
          </InputVali>
          <InputVali>
            <InputBox
              type="text"
              name="body"
              value={todo.body}
              onChange={onChange}
              className="input-txt"
              placeholder='내용 (300자 이내)'
              maxLength={300}
            />
            <Valitext>{bodyError}</Valitext>
          </InputVali>
          
        </InputContainer>
        
        
        
        
        <BtnBox>
          <BtnAdd type="submit" form="add" className="form-btn" >추가하기</BtnAdd>
          <BtnReset type="button" onClick={onReset} className="form-btn">리셋하기</BtnReset>
        </BtnBox>
    </FormBox>
  );
};
  

// function getCurrentState () {}
// export default connect(getCurrentState) (Form);
export default Form;

const FormBox = styled.form`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  height: 40px;
  margin: 40px 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 900px) {
    }


  
`;

const InputContainer = styled.section`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
@media screen and (max-width: 900px) {
  display: block;
    }

`;

const InputVali = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  font-family: 'IBM Plex Sans KR', sans-serif;

  @media screen and (max-width: 900px) {
        width: 90%;
        margin: 0 auto 0 auto;
    }
  
`

const InputBox = styled.input`
font-family: 'IBM Plex Sans KR', sans-serif;
height: 40px;
margin: 10px;
padding: 0px;
background-color: transparent;

outline: 0;
border-width: 0 0 1px;
border-color: #39796b;

  color: #39796b;
  font-size: 0.8rem;
  font-weight: 400;
    @media screen and (max-width: 900px) {
        
    }
`;

const BtnBox = styled.div`

width: 100%;
display: flex;
flex-direction: row;
justify-content: end;
@media screen and (max-width: 900px) {
        justify-content: center;
        height: 120px;
        margin-top: 10px;
    }

`;

const BtnAdd = styled.button`
font-family: 'IBM Plex Sans KR', sans-serif;
display: block;
width: 10%;
height: 32px;
margin: 10px;
color: #39796b;
font-weight: 600;
font-size: 0.7rem;
border: 1px solid #39796b;
background-color: transparent;
cursor: pointer;


&:hover {
  background-color: #39796b;
  color: white;
}

@media screen and (max-width: 900px) {
        width: 30%;
    }


`;

const BtnReset = styled.button`
font-family: 'IBM Plex Sans KR', sans-serif;
display: block;
width: 10%;
height: 32px;
margin: 10px;
color: #39796b;
font-weight: 600;
font-size: 0.7rem;
border: 1px solid #39796b;
background-color: transparent;
cursor: pointer;

&:hover {
  background-color: #39796b;
  color: white;
}

@media screen and (max-width: 900px) {
        width: 30%;
    }

`;


const Valitext = styled.div`
width: 100%;
margin-left: 10px;
padding: 0px;
font-size: 0.7rem;
color: red;
`