import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos.js";
import comments from "../modules/comments.js";

const store = configureStore({
  reducer: {
    todos,
    comments,
  },
  //배포 모드일때 리덕스 데브툴 사용 안함
  devTools: process.env.REACT_APP_MOD !== 'production'
});

export default store;
