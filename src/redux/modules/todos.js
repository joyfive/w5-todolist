import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [
    {
      id: "0",
      title: "sample",
      body: "sample",
      writer: "sample",
      isDone: true,
    },
  ],
  todo: {
    id: "0",
    title: "",
    body: "",
    writer: "test",
    isDone: false,
  }
};

export const __getTodos = createAsyncThunk(
  "todos/getTodos",//type
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL_TODOS}`);
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
  console.log("redux", payload)
  
  //id Max값 여기서 구현해봄
  const getTodos = await axios.get(`${process.env.REACT_APP_API_URL_TODOS}`);
  const todosIdArr = getTodos.data.map((e) => { return e.id });
  await axios.post(`${process.env.REACT_APP_API_URL_TODOS}`, { id: (Math.max(todosIdArr) + 1), isDone: false, ...payload });
  const data = await axios.get(`${process.env.REACT_APP_API_URL_TODOS}`);
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
  await axios.delete(`${process.env.REACT_APP_API_URL_TODOS}/${payload}`);
  const data = await axios.get(`${process.env.REACT_APP_API_URL_TODOS}`);
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
      await axios.patch(`${process.env.REACT_APP_API_URL_TODOS}/${payload.id}`, payload);
      const data = await axios.get(`${process.env.REACT_APP_API_URL_TODOS}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateContent = createAsyncThunk(
  "todos/updateContent",//type
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL_TODOS}/${payload.id}`, payload);
      const data = await axios.get(`${process.env.REACT_APP_API_URL_TODOS}/${payload.id}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getID = createAsyncThunk(
  "todos/getID",//type
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL_TODOS}/${payload}`);
      return thunkAPI.fulfillWithValue(data);
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
      state.isSuccess = false;
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isSuccess = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //-__addTodo-
    [__addTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodo.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [__addTodo.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
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
    //-__updateContent-
    [__updateContent.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateContent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__updateContent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //-__getID
    [__getID.pending]: (state) => {
      state.isLoading = true;
    },
    [__getID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__getID.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },

});

export const { getID } = todosSlice.actions;
export default todosSlice.reducer;