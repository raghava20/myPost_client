import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById } from "../redux/features/postSlice";
import PostForm from "../components/PostForm";
import { RootState } from "../redux/store";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, loading } = useSelector((state: RootState) => state.post);

  console.log(post, "post id");
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  if (loading && !post) {
    return (
      <div className="m-auto w-full min-h-screen">
        <main className="m-auto pt-24 pb-16 max-w-3xl container">
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <div className="mb-4 border-primary border-t-2 rounded-full w-16 h-16" />
            <p className="">Loading post...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <main className="m-auto pt-24 pb-16 max-w-3xl container">
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <p className="text-destructive">Post not found</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-primary underline"
            >
              Go back to posts
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-16 min-h-screen">
      <main className="m-auto pt-24 pb-16 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-bold text-3xl tracking-tighter">Edit Post</h1>
          <p className="mt-2 text-muted-foreground">
            Update your post with the form below.
          </p>
        </div>

        <div className="bg-card shadow-sm p-6 border rounded-lg">
          <PostForm initialData={post} id={id} />
        </div>
      </main>
    </div>
  );
}
