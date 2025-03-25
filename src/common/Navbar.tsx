import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logoutUser } from "../redux/features/authSlice";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user || localStorage.getItem("user")
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="flex justify-between items-center bg-blue-500 p-4 text-white">
      <div className="font-bold text-xl">MyPosts</div>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/posts" className="hover:underline">
              My Posts
            </Link>
            <Link to="/posts/create" className="hover:underline">
              New Post
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              size="small"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
