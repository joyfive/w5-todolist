import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: "1",
      title: "리덕스 101 강의듣기",
      body: "노마드 코더의 강의를 들어봅시다",
      isDone: true,
    },
    {
      id: "2",
      title: "리덕스로 수정해보기",
      body: "기능을 개발해보자",
      isDone: false,
    },
  ],
  todo: {
    id: "0",
    title: "",
    body: "",
    isDone: false,
  }
};

export const todosSlice = createSlice({

  name: "todos",
  initialState,
  reducers: {

    addTodo(state, action) {
      state.todos.push(action.payload);
    },

    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    switchStatus(state, action) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      })
    },

    getID(state, action) {
      state.todo = state.todos.find((todo) => {
        return todo.id === action.payload;
      })
    }

  }

});

export const { addTodo, deleteTodo, switchStatus, getID } = todosSlice.actions;
export default todosSlice.reducer;