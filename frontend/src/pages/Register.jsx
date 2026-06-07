
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", {
                name,
                email,
                password,
            });

            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
