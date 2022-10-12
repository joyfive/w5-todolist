import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from '../redux/modules/todos';
import styled from "styled-components";

let num = 4;
const Form = () => {
    const dispatch = useDispatch();
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
        
        if (todo.title.trim() === "" || todo.body.trim() === "") return;
        dispatch(addTodo({ ...todo, id: num }));
        setTodo({
          id: 0,
          title: "",
          body: "",
          isDone: false,
        });
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
              placeholder='제목을 입력하세요.'
            />
            <InputBox
              type="text"
              name="body"
              value={todo.body}
              onChange={onChange}
              className="input-txt"
              placeholder='내용을 입력하세요.'
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
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  height: 40px;
  margin: 40px 10px;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.section`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const InputBox = styled.input`
width: 43%;
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
`;

const BtnBox = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: end;

`;

const BtnAdd = styled.button`
display: block;
width: 10%;
height: 32px;
margin: 10px;
color: #39796b;
font-weight: 600;
font-size: 0.7rem;
border: 1px solid #39796b;
background-color: transparent;

&:hover {
  background-color: #39796b;
  color: white;
}


`;

const BtnReset = styled.button`
display: block;
width: 10%;
height: 32px;
margin: 10px;
color: #39796b;
font-weight: 600;
font-size: 0.7rem;
border: 1px solid #39796b;
background-color: transparent;

&:hover {
  background-color: #39796b;
  color: white;
}
`;
