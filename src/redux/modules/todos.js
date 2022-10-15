// src/redux/modules/config/configStore.js

import { configureStore } from "@reduxjs/toolkit";
/**
 * import 해온 것은 slice.reducer 입니다.
 */
import counter from "../modules/counterSlice";
import todos from "../modules/todosSlice";

/**
 * 모듈(Slice)이 여러개인 경우
 * 추가할때마다 reducer 안에 각 모듈의 slice.reducer를 추가해줘야 합니다.
 *
 * 아래 예시는 하나의 프로젝트 안에서 counter 기능과 todos 기능이 모두 있고,
 * 이것을 각각 모듈로 구현한 다음에 아래 코드로 2개의 모듈을 스토어에 연결해준 것 입니다.
 */
const store = configureStore({
  reducer: { counter: counter, todos: todos },
});

export default store;






// Action value

// const ADD_TODO = "ADD_TODO";
// const GET_ID = "GET_ID";
// const DELETE_TODO = "DELETE_TODO";
// const SWITCH_STATUS = "SWITCH_STATUS";

// // Action Creator
// // Todo를 추가하는 action creator
// export const addTodo = (payload) => {
//   return {
//     type: ADD_TODO,
//     payload,
//   };
// };

// // Todo를 지우는 action creator
// export const deleteTodo = (payload) => {
//   return {
//     type: DELETE_TODO,
//     payload,
//   };
// };

// // Todo를 isDone를 변경하는 action creator
// export const switchStatus = (payload) => {
//   return {
//     type: SWITCH_STATUS,
//     payload,
//   };
// };

// // 상세 페이지에서 특정 Todo만 조회하는 action creator
// export const getID = (payload) => {
//   return {
//     type: GET_ID,
//     payload,
//   };
// };

// // initial state
// const init = {
//   todos: [
//     {
//       id: "1",
//       title: "리덕스 101 강의듣기",
//       body: "노마드 코더의 강의를 들어봅시다",
//       isDone: true,
//     },
//     {
//       id: "2",
//       title: "리덕스로 수정해보기",
//       body: "기능을 개발해보자",
//       isDone: false,
//     },
//   ],
//   todo: {
//     id: "0",
//     title: "",
//     body: "",
//     isDone: false,
//   }
// };

// const todos = (state = init, action) => {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         ...state,
//         todos: [...state.todos, action.payload],
//       };

//     case DELETE_TODO:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.payload),
//       };

//     case SWITCH_STATUS:
//       return {
//         ...state,
//         todos: state.todos.map((todo) => {
//           if (todo.id === action.payload) {
//             return {
//               ...todo,
//               isDone: !todo.isDone,
//             };
//           } else {
//             return todo;
//           }
//         }),
//       };

//     case GET_ID:
//       return {
//         ...state,
//         todo: state.todos.find((todo) => {
//           return todo.id === action.payload;
//         }),
//       };
      
//     default:
//       return state;
      
//   }
  
// };


// export default todos;
