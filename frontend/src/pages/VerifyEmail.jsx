import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const { token } = useParams();

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        try {
            const res = await API.get(
                `/auth/verify-email/${token}`
            );

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
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-2xl font-bold">
                Verifying your email...
            </h1>
        </div>
    );
};

export default VerifyEmail;