import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const navClass = ({ isActive }) =>
        `transition duration-200 ${
            isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-blue-200"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-blue-700 text-white shadow-md">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl md:text-2xl font-bold hover:text-blue-200 transition"
                >
                    💼 HireNest
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">

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

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">

                    {user ? (
                        <>
                            <div className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full shadow">
                                <span>👤</span>

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
                            <NavLink to="/login" className={navClass}>
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

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (

                <div className="md:hidden bg-blue-800 px-4 pb-4 flex flex-col gap-4">

                    <NavLink
                        to="/"
                        className={navClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/companies"
                        className={navClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Companies
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={navClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={navClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Profile
                            </NavLink>
                        </>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <NavLink
                                to="/admin-dashboard"
                                className={navClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Admin Dashboard
                            </NavLink>

                            <NavLink
                                to="/admin"
                                className={navClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Applications
                            </NavLink>

                            <NavLink
                                to="/admin-companies"
                                className={navClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Internships
                            </NavLink>
                        </>
                    )}

                    {user ? (
                        <>
                            <div className="bg-blue-600 rounded-lg p-3">
                                👤 {user.name || user.email}
                            </div>

                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                            >
                                🚪 Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={navClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-center font-semibold"
                                onClick={() => setMenuOpen(false)}
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                </div>

            )}

        </nav>
    );
};

export default Navbar;