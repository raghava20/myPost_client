import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/features/postSlice";
import { AppDispatch } from "../redux/store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

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
