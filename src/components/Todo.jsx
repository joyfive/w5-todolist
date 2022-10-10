import React from "react";
import "./style.css";

function Todo({ todo, onEdit, onDelete }) {

 return (
        <div className={todo.isDone ? "todo-container" : "new-container"}>
          <div className="todo-cont">
              <div className="todo-tit">{todo.title}</div>
              <div className="todo-body">{todo.body}</div>
          </div>
          <div className="btn-set">
              <button 
              className="btn del"
              onClick={() => onDelete(todo.id)}
              >❌ 삭제</button>
              <button 
              onClick={() => onEdit(todo.id)} 
              className={todo.isDone ? "btn cancel" : "btn done"}>
              {todo.isDone ? '🚫 취소' : '⭕️ 완료' }
              </button>
          </div>

        </div>
      );
    
};
export default Todo;