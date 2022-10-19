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
    ]
};

export const __getComments = createAsyncThunk(
    "comments/getComments",//type
    async (detailConId, thunkAPI) => {
        try {
            const data = await axios.get("https://w5hh.herokuapp.com/comments");
            const filterData = data.data.filter((val) => { return val.contentId === detailConId });
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
            const getComments = await axios.get("https://w5hh.herokuapp.com/comments");
            const commentsIdArr = getComments.data.map((e) => { return e.id })
            await axios.post("https://w5hh.herokuapp.com/comments", { ...payload, id: (Math.max(commentsIdArr) + 1), isMod: false });
            const data = await axios.get("https://w5hh.herokuapp.com/comments");
            const filterData = data.data.filter((val) => { return val.contentId === payload.contentId });
            return thunkAPI.fulfillWithValue(filterData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __deleteComment = createAsyncThunk(
    "comments/deleteComment",//type
    async (payload, thunkAPI) => {
        try {
            await axios.delete(`https://w5hh.herokuapp.com/comments/${payload.id}`, { data: { contentId: Number(payload.contentId) } });
            const data = await axios.get("https://w5hh.herokuapp.com/comments");
            const filterData = data.data.filter((val) => { return val.contentId === payload.contentId });
            return thunkAPI.fulfillWithValue(filterData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __updateComment = createAsyncThunk(
    "Comments/updateComment",//type
    async (payload, thunkAPI) => {
        try {
            await axios.patch(`https://w5hh.herokuapp.com/comments/${payload.id}`, payload);
            const data = await axios.get("https://w5hh.herokuapp.com/comments");
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
            //선택한 댓글 찾기
            const findComment = state.comments.find((val) => { return val.id === action.payload });
            //선택한 댓글 인덱스
            const findComIndex = state.comments.findIndex((val) => { return val.id === action.payload });
            //선택한 댓글 복사 & isMod값 수정
            const changeIsMod = { ...findComment, isMod: !findComment.isMod };
            //state 변경
            state.comments.splice(findComIndex, 1, changeIsMod);
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
        //-__deleteComment-
        [__deleteComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__deleteComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        },
        [__deleteComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //-__updateComment-
        [__updateComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__updateComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        },
        [__updateComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    },

});

export const { commentIsMod } = commentsSlice.actions;
export default commentsSlice.reducer;
