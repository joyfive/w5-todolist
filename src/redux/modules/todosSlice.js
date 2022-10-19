//미사용 파일

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

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post('https://w5t2.herokuapp.com/todos', payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
);

export const getTodosThunk = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('https://w5t2.herokuapp.com/todos/');
      return thunkAPI.fulfillWithValue(data.reverse());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (payload, thunkAPI) => {
    try {
      axios.delete(`https://w5t2.herokuapp.com/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
      }
    }
);

export const switchStatusThunk = createAsyncThunk(
  "todos/switchStatus",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${payload.id}`, payload);
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data.reverse());
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getIdThunk = createAsyncThunk(
  "todos/getID",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`https://w5t2.herokuapp.com/todos/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`https://w5t2.herokuapp.com/todos/${payload.id}`, payload);
      const data = await axios.get(`https://w5t2.herokuapp.com/todos/${payload.id}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",

  initialState,
 
  reducers: {
    getID(state, action) {
      state.todo = state.todos.find((todo) => {
        return todo.id === action.payload;
      })
    },
    resetTodo: (state) => {
      state.todo = {
        id: 0,
        body: "",
        username: "",
        title: "",
      };
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
      state.todo = action.payload
    },
    [getIdThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getIdThunk.pending]: (state) => {
      state.isLoading = true;
    },

    [getTodosThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [getTodosThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getTodosThunk.pending]: (state) => {
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

    [switchStatusThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [switchStatusThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [switchStatusThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteTodoThunk.fulfilled]: (state, action) => {
      const target = state.todos.findIndex(
        (comment) => comment.id === action.payload
      );
      state.todos.splice(target, 1);
    },
    [deleteTodoThunk.pending]: () => {},
    [deleteTodoThunk.rejected]: () => {},

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

export const { addTodo, deleteTodo, switchStatus, getID, resetTodo } = todosSlice.actions;
export default todosSlice.reducer;