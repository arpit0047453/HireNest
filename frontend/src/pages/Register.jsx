import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            return toast.error(
                "Password must be at least 6 characters."
            );
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            return toast.error(
                "Passwords do not match."
            );
        }

        try {
            setLoading(true);

            await API.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            toast.success(
                "Registration successful! Please verify your email."
            );

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 py-8">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-8">
                    Create Account 🚀
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="relative">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-3 pr-12 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-3 text-gray-500"
                        >
                            {showPassword ? "🙈" : "👁"}
                        </button>

                    </div>

                    <div className="relative">

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={
                                formData.confirmPassword
                            }
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-3 pr-12 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="absolute right-4 top-3 text-gray-500"
                        >
                            {showConfirmPassword
                                ? "🙈"
                                : "👁"}
                        </button>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm sm:text-base transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                <p className="text-center text-sm sm:text-base text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;