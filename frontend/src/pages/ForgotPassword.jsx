import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.post("/auth/forgot-password", {
                email,
            });

            toast.success(
                "Password reset link sent to your email."
            );

            setEmail("");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to send reset link."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 py-8">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-2">
                    Forgot Password
                </h1>

                <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
                    Enter your registered email address.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm sm:text-base transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>

                </form>

                <p className="text-center text-sm sm:text-base mt-6">

                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default ForgotPassword;