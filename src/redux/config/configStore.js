import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos.js";
import comments from "../modules/comments.js";

const store = configureStore({
  reducer: {
    todos,
    comments,
  },
});

export default store;