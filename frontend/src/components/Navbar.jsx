import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav
            style={{
                padding: "15px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/">Home</Link>
                <Link to="/companies">Companies</Link>
                <Link to="/profile">
                    Profile
                </Link>

                {user && (
                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                )}
            </div>

            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: "10px" }}>
                            Welcome {user.email}
                        </span>

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>{" "}
                        <Link to="/register">Register</Link>

                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;