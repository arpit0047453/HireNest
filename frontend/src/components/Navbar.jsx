import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const navClass = ({ isActive }) =>
        `transition duration-200 ${isActive
            ? "text-yellow-300 font-semibold"
            : "hover:text-blue-200"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-blue-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold hover:text-blue-200 transition"
                >
                    💼 HireNest
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">

                    <NavLink to="/" className={navClass}>
                        Home
                    </NavLink>

                    <NavLink to="/companies" className={navClass}>
                        Companies
                    </NavLink>

                    {user && (
                        <>
                            <NavLink to="/dashboard" className={navClass}>
                                Dashboard
                            </NavLink>

                            <NavLink to="/profile" className={navClass}>
                                Profile
                            </NavLink>
                        </>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <NavLink
                                to="/admin-dashboard"
                                className={navClass}
                            >
                                Admin Dashboard
                            </NavLink>

                            <NavLink
                                to="/admin"
                                className={navClass}
                            >
                                Applications
                            </NavLink>

                            <NavLink
                                to="/admin-companies"
                                className={navClass}
                            >
                                Internships
                            </NavLink>
                        </>
                    )}

                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {user ? (
                        <>
                            <div className="hidden md:flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full shadow">
                                <span className="text-lg">👤</span>

                                <span className="text-sm font-medium">
                                    {user.name || user.email}
                                </span>
                            </div>

                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition"
                            >
                                🚪 Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={navClass}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
};

export default Navbar;