import { createStore } from "redux";
import { combineReducers } from "redux";
import todos from "../modules/todosSlice";

const rootReducer = combineReducers({
  todos,
});
const store = createStore(rootReducer);

export default store;

// const rootReducer = combineReducers({
//     todos,
// });

// const store = createStore(rootReducer);

// const ADD = "ADD";
// const DELETE = "DELETE";


// export const addTodo = (title, body) => {
//     return {
//         type:ADD,
//         title,
//         body
//     }
// }


// export const deleteTodo = id => {
//     return {
//         type: DELETE,
//         id
//     }
// }

// const reducer = (state = [], action) => {
//     switch (action.type) {
//         case ADD:
//             return [{ title: action.title, body: action.body, id: Date.now() }, ...state]
//         case DELETE:
//             return state.filter(todo => todo !== action.id);
//         default:
//         return state;
    
//         }
// };



// export default store;


// import { createStore } from "redux";
// import { combineReducers } from "redux";
// import todos from "../modules/todos";

// const rootReducer = combineReducers({
//   todos,
// });
// const store = createStore(rootReducer);

// export default store;