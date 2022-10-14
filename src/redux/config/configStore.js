import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos.js";

const store = configureStore({
  reducer: {
    todos,
  },
});

export default store;