import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from '../redux/modules/todos';
import styled from "styled-components";

let num = 3
const Form = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const [todo, setTodo] = useState({
      id: 0,
      title: "",
      body: "",
      isDone: false,
    });
  
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
        if (todos.title.trim() === "" || todos.body.trim() === "") return;
        dispatch (addTodo({ ...todos, id: num }));
        setTodo(
          {
            id: 0,
            title: "",
            body: "",
            isDone: false,
          }
        );
        num++;
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
};
  

// function getCurrentState () {}
// export default connect(getCurrentState) (Form);
export default Form;

const FormBox = styled.form`
width: 100%;
height: 40px;
margin: 0 0 120px 0;
`;

const InputContainer = styled.section`
width: 100%;
margin: 0 auto 0 auto;
padding: 0 auto 0 auto;
`;

const InputBox = styled.input`
width: 40%;
height: 56px;

`;

const BtnBox = styled.div`
width: 100%;
margin: 0 auto 0 auto;
padding: 0 auto 0 auto;
`;

const BtnAdd = styled.button`
width: 20%;
height: 56px;
`;

const BtnReset = styled.button`
width: 20%;
height: 56px;
`;
