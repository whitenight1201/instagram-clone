import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "../../services/post.service";
import { IPostData } from "../../types/post";

export const fetchPosts = createAsyncThunk(
  "posts/all",
  async (pagenum: number, { rejectWithValue }) => {
    try {
      const response = await PostService.fetchposts(pagenum);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/add",
  async (postdata: FormData, { rejectWithValue }) => {
    try {
      const response = await PostService.addpost(postdata);
      // console.log(response){content: 'adfsdf', file: '1TSmNeG5P.png', type: 'asdfasdf', author: {…}, _id: '65033f8c9050ef343d864aa3', …}author: {_id: '6502771a2cdf8a3ba431c3b0', username: 'bruce'}content: "adfsdf"createdAt: "2023-09-14T17:14:52.460Z"file: "1TSmNeG5P.png"id: "65033f8c9050ef343d864aa3"type: "asdfasdf"updatedAt: "2023-09-14T17:14:52.460Z"__v: 0_id: "65033f8c9050ef343d864aa3"[[Prototype]]: Object
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export interface IPostsList {
  posts: IPostData[];
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
}

const initialState: IPostsList = {
  posts: [],
  currentPage: 0,
  hasMore: true,
  loading: true,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts(state) {
      state.posts = initialState.posts; // Reset posts to initial value
      state.currentPage = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCHING ALL POSTS
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log(
          "~~~~~~~~~~~~~~~~~~~currentPage, hasmore, payloadlen: " +
            state.currentPage,
          state.hasMore,
          action.payload.length
        );
        state.loading = false;
        if (action.payload.length > 0) {
          state.posts = [...state.posts, ...action.payload];
          state.currentPage++;
          state.hasMore = action.payload.length === 5;
        } else {
          // This is the last page, set hasMore to false
          state.hasMore = false;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.currentPage = 0;
        state.loading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
const { reducer, actions } = postsSlice;

export const { resetPosts } = actions;

export default reducer;
