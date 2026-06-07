import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Button clicked");

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            console.log(res.data);

            login(res.data);
            navigate("/");
        } catch (err) {
            console.log(err);
            alert("Login failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;