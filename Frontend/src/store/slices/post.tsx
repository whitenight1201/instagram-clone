import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "../../services/post.service";
import { ICommentaryParms, ILikePostParms, IPostData } from "../../types/post";

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
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "commentaries/all",
  async (post_id: string, { rejectWithValue }) => {
    try {
      const response = await PostService.fetchcomments(post_id);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "commentaries/add",
  async ({ post_id, commentary }: ICommentaryParms, { rejectWithValue }) => {
    try {
      const response = await PostService.addcomment(post_id, commentary);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addLikeToPost = createAsyncThunk(
  "like/add",
  async ({ post_id, like }: ILikePostParms, { rejectWithValue }) => {
    try {
      const response = await PostService.addliketopost(post_id, like);
      return { respdata: response, post_id };
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
  showhidepostpanel: boolean;
  likeordislike: boolean;
}

const initialState: IPostsList = {
  posts: [],
  currentPage: 0,
  hasMore: true,
  loading: true,
  showhidepostpanel: false,
  likeordislike: false,
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
    showHidePostModal(state) {
      state.showhidepostpanel = !state.showhidepostpanel;
      return;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length > 0) {
          state.posts.push(...action.payload);
          // state.posts = [...state.posts, ...action.payload];
          state.currentPage++;
          state.hasMore = action.payload.length === 5;
        } else {
          // This is the last page, set hasMore to false
          state.hasMore = false;
        }
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift({ post: { ...action.payload }, comments: [] });
        state.showhidepostpanel = !state.showhidepostpanel;
      })
      .addCase(addPost.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const updataIdx = state.posts.findIndex(
          (x) => x.post._id === action.payload.post_id
        );
        // state.posts[updataIdx].comments.push(...action.payload);
        const deletecnt = state.posts[updataIdx].comments.length;
        state.posts[updataIdx].comments.splice(
          0,
          deletecnt,
          ...action.payload.respdata
        );
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const updataIdx = state.posts.findIndex(
          (x) => x.post._id === action.payload.post
        );
        state.posts[updataIdx].comments?.unshift({ ...action.payload });
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(addLikeToPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLikeToPost.fulfilled, (state, action) => {
        state.loading = false;
        state.likeordislike = !state.likeordislike;

        const updataIdx = state.posts.findIndex(
          (x) => x.post._id === action.payload.post_id
        );
        state.posts[updataIdx].post.selectpostlikeflag = state.likeordislike;
        state.posts[updataIdx].post.likecnt = action.payload.respdata.likecnt;
      })
      .addCase(addLikeToPost.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer, actions } = postsSlice;

export const { resetPosts, showHidePostModal } = actions;

export default reducer;
