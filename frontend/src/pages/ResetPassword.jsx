import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            return toast.error(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
            );
        }

        try {
            setLoading(true);

            const res = await API.post(
                `/auth/reset-password/${token}`,
                {
                    password,
                }
            );

            toast.success(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Password reset failed."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 py-8">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6">
                    Reset Password
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
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
                            ? "Updating..."
                            : "Reset Password"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ResetPassword;