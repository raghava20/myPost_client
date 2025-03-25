import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchPosts } from "../redux/features/postSlice";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { Button } from "@mui/material";
import { logoutUser } from "../redux/features/authSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <div>Elegant Posts</div>
    </div>
  );
};

export default Dashboard;
