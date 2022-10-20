import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { __getTodos, __deleteTodo, __updateStatus } from "../redux/modules/todos.js";
import styled from "styled-components";
import Todo from './Todo'
import { IoIosRepeat } from "react-icons/io";
import Btn from "../components/element/Btn"

const List = () => {

  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const [useDoDisplay, setUseDoDisplay] = useState("block");
  const [useDoneDisplay, setUseDoneDisplay] = useState("none");
  const onToggle = () => {
    useDoDisplay === "block" ? setUseDoDisplay("none") : setUseDoDisplay("block");
    useDoneDisplay === "none" ? setUseDoneDisplay("block") : setUseDoneDisplay("none");
}
//   const onToggleDone = () => {
//     useDoneDisplay === "none" ? setUseDoneDisplay("block") : setUseDoneDisplay("none");
//     useDoDisplay === "block" ? setUseDoDisplay("none") : setUseDoDisplay("block");
// }
  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const onStatus = (id) => {
    let findTodo = Object.assign({}, todos.find((todo) => {
      return todo.id === id;
    }))

    findTodo.isDone ? findTodo.isDone = false : findTodo.isDone = true;

    dispatch(__updateStatus(findTodo));
  };

  const onDelete = (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(__deleteTodo(id));
      window.alert('삭제가 완료되었습니다.')
    };
  }

  if (todos.length === 0)
  return (
    <div>
      <ListTit>등록된 할일이 없습니다.</ListTit>
    </div>
  );
  if (isLoading) {
    return <div>처리 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ListCont>
      
      <Toggle isDisplay={useDoDisplay}>
        <ListTit>해야 할일.<Btn onClick={onToggle} size="small"><IoIosRepeat className='ico' /></Btn></ListTit>
        <ListWrap>
          {todos.map((todo) => {
            if (!todo.isDone) {
              return (
                <Todo
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  onDelete={onDelete}
                  onEdit={onStatus}
                />
              );
            } else {
              return null;
            }
          })}
        </ListWrap>
        </Toggle>
        <Toggle isDisplay={useDoneDisplay}>
        <ListTit>완료한 할일.<Btn onClick={onToggle} size="small"><IoIosRepeat className='ico' /></Btn></ListTit>
        <ListWrap>
          {todos.map((todo) => {
            if (todo.isDone) {
              return (
                <Todo
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  onDelete={onDelete}
                  onEdit={onStatus}
                />
              )
            } else {
              return null;
            }
          })}

        </ListWrap>
        </Toggle>
    </ListCont>
  );
}

export default List;

const Toggle = styled.div`
  display : ${(props) => props.isDisplay};
`

const ListWrap = styled.article`
  margin: 20px auto;
  width: 850px;
  max-width: 90%;
  height: 560px;
  background-color: white;
  border: 1px solid #bdc4d5;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 2px 10px #9dabca;
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */
  /* align-items: top; */

  @media screen and (max-width: 900px) {
        min-height: 100px;
        margin: 0 auto;
        max-height: 100%;
        flex-direction: column;
        flex-wrap: nowrap;
        width: 60%;
        align-content: center;
    }
    @media screen and (max-width: 500px) {
        width: 90%;
    }
  
`

const ListCont = styled.section`
  margin: 80px auto 70px auto;
  padding: 10px;
  min-height: 72vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 900px) {
        /* flex-direction: column;
        align-content: center;
        align-items: center; */
        display: block;
        margin: 80px auto 20px auto;
    }
  
`

const ListTit = styled.section`
grid-template-rows: 2 / 3;
grid-template-columns: 3 / 4;
font-weight: 700;
font-size: 2rem;
color: #121212;
margin: 10px 20px;
text-align: center;

@media screen and (max-width: 900px) {
        margin-top: 40px;
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 20px;
        
    }

    .ico {
      background-color: transparent;
    }
`