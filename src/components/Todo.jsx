import React from "react";
import { Link } from "react-router-dom";
function Todo({ todo, onEdit, onDelete }) {

 return (
        <div className={todo.isDone ? "todo-container" : "new-container"}>
          <div className="todo-cont">
              <div> 
                <div className="todo-tit">{todo.title}</div>
                <Link to={`/${todo.id}`} key={todo.id}> 👉 </Link>
              </div>
              <div className="todo-body">{todo.body}</div>
          </div>
          <div className="btn-set">
              <button 
              className="btn del"
              onClick={() => onDelete(todo.id)}
              >❌</button>
              <button 
              onClick={() => onEdit(todo.id)} 
              className={todo.isDone ? "btn cancel" : "btn done"}>
              ✅
              </button>
          </div>

        </div>
      );
    
};
export default Todo;