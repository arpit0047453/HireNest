import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-blue-600">
                404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-600 mt-3 max-w-md">
                The page you're looking for doesn't exist or has been moved.
            </p>

            <Link
                to="/"
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition w-full sm:w-auto text-center"
            >
                Go Home
            </Link>

        </div>
    );
};

export default NotFound;