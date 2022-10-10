import React from 'react';
import Todo from "../todo/Todo";
import "./style.css";

function List({ todos, setTodos }) {
  const onDelete = (todoId) => {
    const todoItem = todos.filter((todo) => {
      return todo.id !== todoId;
    });
    setTodos(todoItem);
  };
  const onEdit = (todoId) => {
    const todoItem = todos.map((todo) => {
      return (todo.id === todoId ? {...todo, isDone: !todo.isDone,} :  {...todo} )

    });
    setTodos(todoItem);
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
                setTodos={setTodos}
                onDelete={onDelete}
                onEdit={onEdit}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="list-tit">완료 😎</div>
        <div className="list-wrap">
        {todos.map((todo) => {
            if (todo.isDone) {
              return (
                <Todo
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
                onDelete={onDelete}
                onEdit={onEdit}
                />
              )
            } else {
              return null;
            }
          })}
        </div>
    </div>
  );
}

export default List;