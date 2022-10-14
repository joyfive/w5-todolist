import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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

export const __getTodos = createAsyncThunk(
  "todos/getTodos",//type
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addTodo = createAsyncThunk(
  "todos/addTodo",//type
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/todos", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "todos/deleteTodo",//type
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${payload}`);
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateStatus = createAsyncThunk(
  "todos/updateStatus",//type
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${payload.id}`, payload);
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
    }
  },

  extraReducers: {
    //-__getTodos-
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //-__addTodo-
    [__addTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__addTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //-__deleteTodo-
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //-__updateStatus-
    [__updateStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateStatus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__updateStatus.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

});

export const { getID } = todosSlice.actions;
export default todosSlice.reducer;