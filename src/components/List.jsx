import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, switchStatus } from "../redux/modules/todos.js";
import styled from "styled-components";
import Todo from './Todo'


const List = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const onDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const onStatus = (id) => {
    dispatch(switchStatus(id));
  };

  return (
    <div className="list-container">
        <div className="list-tit">할일 🙄</div>
        <div className="list-wrap">
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
        </div>
        <div className="list-tit">완료 😎</div>
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
  );
}

export default List;

const ListWrap = styled.div`
  margin: 20;
`