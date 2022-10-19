import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addTodo, __getTodos } from '../redux/modules/todos';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import Btn from "../components/element/Btn"

const Form = () => {
  const { isSuccess, error, todos } = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);


  //id최대값
  const getMaxId = () => {
    let stateIdArr = todos.map(element => {
      return Number(element.id)
    });
    return Math.max(...stateIdArr);
  }

  const [todo, setTodo] = useState({
    title: "",
    body: "",
    writer: "",
    isDone: false,
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onReset = () => {
    setTodo({
      title: "",
      body: "",
      writer: "",
    });
  };

  const validateForm = () => {
    let validated = true;
    if (todo.body === "" || todo.title === "" || todo.writer === "") {
      validated = false;
    }
    return validated;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (todo.title.trim() === "" || todo.body.trim() === "" || todo.writer.trim() === "")
        return;

      dispatch(__addTodo({ id: (getMaxId() + 1), ...todo }));
      onReset();
    };
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/todoList");
    } else {
      if (error !== undefined) console.log(error);
    }
  }, [isSuccess]);

  return (
    <>
    <FormBox onSubmit={onSubmit} id="add">
      <InputContainer>
        <InputVali>
          <InputBox
            type="text"
            name="writer"
            value={todo.writer}
            onChange={onChange}
            placeholder='작성자'
          />
          <Valitext>{todo.writer === "" ? '작성자를 입력해주세요.' : ""}</Valitext>
        </InputVali>
        <InputVali>
          <InputBox
            type="text"
            name="title"
            value={todo.title}
            onChange={onChange}
            placeholder='제목'
          />
          <Valitext>{todo.title === "" ? '제목을 입력해주세요.' : ""}</Valitext>
        </InputVali>
        <InputVali>
          <InputBox
            type="text"
            name="body"
            value={todo.body}
            onChange={onChange}
            className="input-txt"
            placeholder='내용'
          />
          <Valitext>{todo.body === "" ? '내용을 입력해주세요.' : ""}</Valitext>
        </InputVali>

      </InputContainer>




      <BtnBox>
        <Btn type="submit" form="add" className="form-btn" >작성하기</Btn>
        <Btn type="button" onClick={onReset} className="form-btn">리셋하기</Btn>
      </BtnBox>
    </FormBox>

    </>
  );
};
  

// function getCurrentState () {}
// export default connect(getCurrentState) (Form);
export default Form;

const FormBox = styled.form`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 80%;
  height: 450px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  
  border: 0;
  border-radius: 20px;
  box-shadow: 0px 2px 10px #9dabca;
  padding: 5%;
  @media screen and (max-width: 900px) {

    }
`

  


const InputContainer = styled.section`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 900px) {
  display: block;
    }

`;

const InputVali = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  font-family: 'IBM Plex Sans KR', sans-serif;

  @media screen and (max-width: 900px) {
        width: 90%;
        margin: 0 auto 0 auto;
    }
  
`

const InputBox = styled.input`
height: 40px;
margin: 10px;
padding: 5px 20px;
background-color: transparent;

outline: 0;
border-width: 1px solid;
border: 1px solid #2c5cc5;
  color: #121212;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 400;
    @media screen and (max-width: 900px) {
        
    }
`;

const BtnBox = styled.div`
border: 0;
border-top: 1px solid #eee;
width: 97%;
margin: 40px auto;
padding: 40px 0 0 0;
display: flex;
flex-direction: column;
justify-content: end;

@media screen and (max-width: 900px) {
        height: 120px;
        margin-top: 10px;
        flex-direction: row;
    }

`;

const Valitext = styled.div`
width: 100%;
margin-left: 10px;
padding: 0px;
font-size: 0.7rem;
color: #f96854;
`