import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="font-bold text-red-500 text-4xl">404 - Page Not Found</h1>
      <p className="mt-2 text-lg">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded text-white"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
