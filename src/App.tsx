import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
import Navbar from "./common/Navbar";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Posts from "./pages/MyPosts";

const App = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user || localStorage.getItem("user")
  );

  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/posts" /> : <Posts />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/posts" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/posts" /> : <Signup />}
        />

        <Route path="/posts" element={user ? <Posts /> : <Login />} />
        <Route
          path="/posts/create"
          element={user ? <CreatePost /> : <Login />}
        />
        <Route
          path="/posts/edit/:id"
          element={user ? <EditPost /> : <Login />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
