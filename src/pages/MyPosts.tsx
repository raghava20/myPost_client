import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchPosts } from "../redux/features/postSlice";
import API from "../utils/axiosInstance";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.post);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Delete post
  const handleDelete = async (postId: string) => {
    try {
      await API.delete(`/posts/delete/${postId}`);
      dispatch(fetchPosts());
      toast.success("Post deleted!");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="mx-auto px-4 container">
      <h1 className="my-6 font-bold text-3xl">All Posts</h1>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {console.log(posts, "getallmypost")}
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md p-4 rounded-lg">
            <img
              src={post.image}
              alt={post.title}
              className="rounded-lg w-full h-48 object-cover"
            />
            {console.log(post)}
            <h2 className="mt-2 font-semibold text-xl">{post.title}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createAt).toDateString()}
            </p>
            <p className="mt-2 text-gray-700 line-clamp-2">{post.text}</p>

            <div className="flex justify-between mt-4">
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => navigate(`/posts/edit/${post._id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p>No posts found, start posting</p>}
      </div>
    </div>
  );
};

export default Posts;
