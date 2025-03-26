import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";

export interface Post {
  _id: string;
  title: string;
  text: string;
  image: string;
  user: string;
  createAt?: Date;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  post: Post | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  post: null,
};

// Fetch Posts
export const fetchPosts = createAsyncThunk("posts", async () => {
  const res = await API.get("/posts");
  return res.data;
});

// Create Post
export const createPost = createAsyncThunk(
  "posts/create",
  async (post: { title: string; text: string; image: File | null }) => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("text", post.text);
    if (post.image) formData.append("image", post.image);

    await API.post("/posts/create", formData);
  }
);
// Update Post
export const updatePost = createAsyncThunk(
  "posts/update",
  async (post: {
    title: string;
    text: string;
    image: File | null | string;
    id: string;
  }) => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("text", post.text);
    if (post.image) formData.append("image", post.image);

    await API.put(`/posts/edit/${post.id}`, formData);
  }
);

//fetch post by id
export const fetchPostById = createAsyncThunk(
  "posts/:id",
  async (id: string) => {
    const res = await API.get(`/posts/${id}`);
    console.log(res, "before upload");
    return res.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.post = action.payload; // Store the fetched post
        state.loading = false;
      });
  },
});

export default postSlice.reducer;
