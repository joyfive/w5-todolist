import React, { useState } from 'react';
// import { Counter } from './features/counter/Counter';
import styled from "styled-components";

const FormBox = styled.form`
width: 100%;
height: 40px;
margin: 0 0 120px 0;
`;

const InputContainer = styled.div`
width: 100%;
margin: 0 auto 0 auto;
padding: 0 auto 0 auto;
`

const InputBox = styled.input`
width: 40%;
height: 56px;

`

const BtnBox = styled.div`
width: 100%;
margin: 0 auto 0 auto;
padding: 0 auto 0 auto;
`

const BtnAdd = styled.button`
width: 20%;
height: 56px;
`
const BtnReset = styled.button`
width: 20%;
height: 56px;
`

let number = 4;
function Form({ setTodos, todos }) {
  const todoItem = {
    id: 0,
    title: "",
    body: "",
    isDone: false,
  };
 
  console.log(todos);

  const [todo, setTodo] = useState(todoItem);
  const onChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onReset = (e) => {
    setTodo({
      title: "",
      body: "",
    });
  };


  const onSubmit = (event) => {
    event.preventDefault();
    if (todo.title.trim() === "" || todo.body.trim() === "") return;
    setTodos([...todos, { ...todo, id: number }]);
    setTodo(todoItem);
    number++;
  };
  


  return (
    <FormBox onSubmit={onSubmit} id="add">
      <InputContainer>
            <InputBox
              type="text"
              name="title"
              value={todo.title}
              onChange={onChange}
              placeholder='제목'
            />
            <InputBox
              type="text"
              name="body"
              value={todo.body}
              onChange={onChange}
              className="input-txt"
              placeholder='내용'
            />
        </InputContainer>
        <BtnBox>
          <BtnAdd type="submit" form="add" className="form-btn" >추가하기</BtnAdd>
          <BtnReset type="button" onClick={onReset} className="form-btn">리셋하기</BtnReset>
        </BtnBox>
    </FormBox>
  );
}
  

// function getCurrentState () {}
// export default connect(getCurrentState) (Form);
export default Form;