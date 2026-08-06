import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token) {
            verify();
        } else {
            toast.error("Invalid verification link.");
        }
    }, [token]);

    const verify = async () => {
        try {
            const res = await API.get(`/auth/verify-email/${token}`);

            toast.success(res.data.message);

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Verification failed."
            );
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md text-center">

                <div className="text-5xl mb-5">
                    📧
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
                    Verifying Email
                </h1>

                <p className="mt-4 text-gray-600 leading-7">
                    Please wait while we verify your email address.
                </p>

                <div className="mt-8 flex justify-center">

                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

                </div>

            </div>

        </div>
    );
};

export default VerifyEmail;