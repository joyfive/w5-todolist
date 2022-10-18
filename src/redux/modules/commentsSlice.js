import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cmts: [],
  cmt: {
    postid: 0,
    id: 0,
    writer: "",
    body: "",
  },
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const addCmtThunk = createAsyncThunk(
  "commnet/addcmt",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post('https://w5t2.herokuapp.com/cmts', payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
);

export const getCmtsThunk = createAsyncThunk(
  "commnet/getcmt",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('https://w5t2.herokuapp.com/cmts/');
      return thunkAPI.fulfillWithValue(data.reverse());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const deleteCmtThunk = createAsyncThunk(
  "comment/deletecmt",
  async (payload, thunkAPI) => {
    try {
      axios.delete(`https://w5t2.herokuapp.com/cmts/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
      }
    }
);


// export const getIdThunk = createAsyncThunk(
//   "todos/getID",
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/todos/${payload}`);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.code);
//     }
//   }
// );

export const updateCmtThunk = createAsyncThunk(
  "comment/updatecmt",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`https://w5t2.herokuapp.com/cmts/${payload.id}`, payload);
      const data = await axios.get(`https://w5t2.herokuapp.com/cmts/${payload.id}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const commnetsSlice = createSlice({
  name: "comts",
  initialState,
  reducers: {

  },


  extraReducers: {
    // [getIdThunk.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.todo = action.payload
    // },
    // [getIdThunk.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [getIdThunk.pending]: (state) => {
    //   state.isLoading = true;
    // },

    [getCmtsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cmts = action.payload;
    },
    [getCmtsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCmtsThunk.pending]: (state) => {
      state.isLoading = true;
    },

    [addCmtThunk.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.cmts = action.payload;
    },
    [addCmtThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.cmts = action.payload;
    },
    [addCmtThunk.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },


    [deleteCmtThunk.fulfilled]: (state, action) => {
      const target = state.cmts.findIndex(
        (comment) => comment.id === action.payload
      );
      state.cmts.splice(target, 1);
    },
    [deleteCmtThunk.pending]: () => {},
    [deleteCmtThunk.rejected]: () => {},

    [updateCmtThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cmt = action.payload;
    },
    [updateCmtThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCmtThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;