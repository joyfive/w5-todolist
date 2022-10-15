// src/redux/modules/todosSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const init = {
//   todos: [
//     // {
//     //   id: "1",
//     // writer: "joyfive",
//     //   title: "리덕스 101 강의듣기",
//     //   body: "노마드 코더의 강의를 들어봅시다",
//     //   isDone: true,
//     // },
//     // {
//     //   id: "2",
//     // writer: "joyfive",
//     //   title: "리덕스로 수정해보기",
//     //   body: "기능을 개발해보자",
//     //   isDone: false,
//     // },
//   ],
//   todo: {
//     id: "0",
//     writer: "",
//     title: "",
//     body: "",
//     isDone: false,
//   }
// };

export const addTodoThunk = createAsyncThunk(
  "ADD_TODO",
  async (payload, thunkAPI) => {
    try {
      const {data} = await axios.post('http://localhost:3001/todos', payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
);

export const deleteTodoThunk = createAsyncThunk(
  "DELETE_TODO",
  async (payload, thunkAPI) => {
    try {
      axios.delete(`http://localhost:3001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
      }
    }
);

export const switchStatusThunk = createAsyncThunk(
  "SWITCH_STATUS",
  async (payload, thunkAPI) => {
    try {
      axios.patch(`http://localhost:3001/todos/${payload.id}/switch`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const getIdThunk = createAsyncThunk(
  "GET_ID",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/todos${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  "UPDATE_TODO",
  async (payload, thunkAPI) => {
    try {
      axios.patch(`http://localhost:3001/todos/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  todos: [],
  todo: {
    id: 0,
    writer: "",
    title: "",
    body: "",
    username: "",
  },
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const todosSlice = createSlice({
  name: "todos",

  initialState,
  reducers: {
    clearTodo: (state, action) => {
      state.isSuccess = false;
    },
  },

// export const todosSlice = createSlice({
//   name: "todos",
//   initalState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos = [...state.todos, { ...action.payload }]
//     },

//     deleteTodo: (state, action) => {
//       state.todos = state.todos.filter(
//         (todos) => todos.id !== parseInt(action.payload)
//       )
//     },
    
//     switchStatus: (state, action) => {
//       state.todos = state.todos.map(
//         (todo) => {todo.id === action.payload ? {
//           ...todo,
//           isDone: !todo.isDone,   
//           } : 
//         todo;
//         }
//       );
//     },

//     getID: (state, action) => {
//       state.todos = state, { todo: state.todos.find(
//         (todo) => {
//           return todo.id === action.payload;
//         }) 
//       }
//     },
// }
// });

  extraReducers: {
    [getIdThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [getIdThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getIdThunk.pending]: (state) => {
      state.isLoading = true;
    },

    [addTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.todos = action.payload;
    },
    [addTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [addTodoThunk.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },

    [deleteTodoThunk.fulfilled]: (state, action) => {
      const target = state.todos.findIndex(
        (comment) => comment.id === action.payload
      );
      state.todos.splice(target, 1);
    },
    [deleteTodoThunk.pending]: () => {},
    [deleteTodoThunk.pending]: () => {},

    [updateTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [updateTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [updateTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, switchStatus, getID } = todosSlice.actions;
export default todosSlice.reducer;