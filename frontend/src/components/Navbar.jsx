import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold hover:text-blue-200 transition"
                >
                    HireNest
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-blue-200 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/companies"
                        className="hover:text-blue-200 transition"
                    >
                        Companies
                    </Link>

                    {user && (
                        <>
                            <Link
                                to="/dashboard"
                                className="hover:text-blue-200 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className="hover:text-blue-200 transition"
                            >
                                Profile
                            </Link>
                        </>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <Link
                                to="/admin-dashboard"
                                className="hover:text-blue-200 transition"
                            >
                                Admin Dashboard
                            </Link>

                            <Link
                                to="/admin"
                                className="hover:text-blue-200 transition"
                            >
                                Applications
                            </Link>

                            <Link
                                to="/admin-companies"
                                className="hover:text-blue-200 transition"
                            >
                                Internships
                            </Link>
                        </>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {user ? (
                        <>
                            <span className="hidden md:block">
                                👋 {user.email}
                            </span>

                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-blue-200 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
};

export default Navbar;