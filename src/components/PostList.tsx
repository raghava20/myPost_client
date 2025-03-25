import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/features/postSlice";
import { RootState } from "../redux/store";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
