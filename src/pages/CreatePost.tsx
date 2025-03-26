import PostForm from "../components/PostForm";

export default function CreatePost() {
  return (
    <div className="m-auto pb-16 w-full min-h-screen">
      <main className="m-auto pt-24 pb-16 w-full max-w-3xl">
        <div className="mb-8">
          <h1 className="font-bold text-3xl tracking-tighter">
            Create New Post
          </h1>
          <p className="mt-2 text-gray-500">
            Share your thoughts with a beautifully designed post.
          </p>
        </div>
        <div className="bg-card shadow-sm p-6 border rounded-lg">
          {/* @ts-ignore */}
          <PostForm />
        </div>
      </main>
    </div>
  );
}
