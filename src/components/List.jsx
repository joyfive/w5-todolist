import React, { useEffect }from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTodosThunk, deleteTodoThunk, switchStatusThunk } from "../redux/modules/todosSlice";
import styled from "styled-components";
import Todo from './Todo'

const List = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodosThunk());
  }, [dispatch]);

  const onStatus = (id) => {
    let findTodo = Object.assign({}, todos.find((todo) => {
      return todo.id === id;
    }))

    findTodo.isDone ? findTodo.isDone = false : findTodo.isDone = true;

    dispatch(switchStatusThunk(findTodo));
  };



  const onDelete = (id) => {
    dispatch(deleteTodoThunk(id));
  };


  useEffect(() => {
    dispatch(getTodosThunk());
  }, [dispatch]);

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
      <div>
        <ListTit>해야 할일.</ListTit>
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
        </div>

        <div>
        <ListTit>완료한 할일.</ListTit>
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
        </div>
    </ListCont>
  );
}

export default List;

const ListWrap = styled.article`
  margin: 10px;
  width: 320px;
  max-height: 560px;
  min-height: 560px;
  background-color: #e2d3c4;
  border: 1px solid #39796b;
  padding: 5px;
  overflow: auto;

  @media screen and (max-width: 900px) {
        min-height: 100px;
        margin: 0 auto;
        max-height: 100%;
    }
  
`

const ListCont = styled.section`
  margin: 80px 0 70px 0;
  padding: 10px;
  min-height: 72vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 900px) {
        /* flex-direction: column;
        align-content: center;
        align-items: center; */
        display: block;
        margin: 140px auto 20px auto;
    }
  
`

const ListTit = styled.section`
grid-template-rows: 2 / 3;
grid-template-columns: 3 / 4;
font-weight: 700;
font-size: 1.4rem;
color: #004d40;
margin: 10px 20px;

@media screen and (max-width: 900px) {
        margin-top: 40px;
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 20px;
        
    }
`