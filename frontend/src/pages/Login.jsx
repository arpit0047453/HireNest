import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showResend, setShowResend] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", formData);

            login(res.data);

            toast.success("Login Successful!");

            navigate("/");
        } catch (error) {

            const message =
                error.response?.data?.message || "";

            if (
                message ===
                "Please verify your email before logging in."
            ) {
                setShowResend(true);
            } else {
                setShowResend(false);
            }
        }
    };

    const resendVerification = async () => {
        try {
            await API.post(
                "/auth/resend-verification",
                {
                    email: formData.email,
                }
            );

            toast.success(
                "Verification email sent successfully."
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 py-8">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-8">
                    Welcome Back 👋
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-xs sm:text-sm text-blue-600 hover:underline"
                        >
                            {showPassword ? "Hide" : "Show"} Password
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-xs sm:text-sm text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm sm:text-base transition"
                    >
                        Login
                    </button>

                    {showResend && (
                        <button
                            type="button"
                            onClick={resendVerification}
                            className="w-full mt-3 border border-blue-600 text-blue-600 py-3 rounded-lg text-sm sm:text-base hover:bg-blue-50 transition"
                        >
                            Resend Verification Email
                        </button>
                    )}

                </form>

                <p className="text-center text-sm sm:text-base text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;