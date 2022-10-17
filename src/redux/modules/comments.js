import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comments: [
        {
            contentId: "0",
            id: "0",
            body: "sample",
            writer: "sample",
        },
    ],
    comment: {
        contentId: "0",
        id: "0",
        body: "",
        writer: "test",
    }
};

export const __getComments = createAsyncThunk(
    "comments/getComments",//type
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get("http://localhost:3001/comments");
            console.log(payload)
            const filterData = data.data.filter((val) => { return val.contentId === payload });
            return thunkAPI.fulfillWithValue(filterData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __addComment = createAsyncThunk(
    "comments/addComment",//type
    async (payload, thunkAPI) => {
        try {
            //id Max값 여기서 구현해봄
            const getComments = await axios.get("http://localhost:3001/comments");
            const commentsIdArr = getComments.data.map((e) => { return e.id })
            await axios.post("http://localhost:3001/comments", { ...payload, id: (Math.max(commentsIdArr) + 1), isMod: false });
            const data = await axios.get("http://localhost:3001/comments");
            const filterData = data.data.filter((val) => { return val.contentId === payload.contentId });
            return thunkAPI.fulfillWithValue(filterData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const commentsSlice = createSlice({

    name: "comments",
    initialState,
    reducers: {
        commentIsMod(state, action) {
            console.log(state)
            // state.comments = state.comments.map((val, i, arr) => {
            //     if (val.id === Number(action.payload)) {
            //         arr[i].isMod = !arr[i].isMod
            //     }
            // })
        }
    },

    extraReducers: {
        //-__getComments-
        [__getComments.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getComments.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.comments = action.payload; // Store에 있는 comments에 서버에서 가져온 comments를 넣습니다.
        },
        [__getComments.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        //-__addComment-
        [__addComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__addComment.fulfilled]: (state, action) => {
            state.comments = action.payload;
            state.isLoading = false;
        },
        [__addComment.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },


    },

});

export const { commentIsMod } = commentsSlice.actions;
export default commentsSlice.reducer;
