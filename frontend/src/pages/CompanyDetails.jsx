import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchApplications();
        }
    }, [user]);

    const fetchApplications = async () => {
        try {
            const res = await API.get("/application");

            const myApplications = res.data.filter(
                (application) =>
                    application.studentEmail === user.email
            );

            setApplications(myApplications);

        } catch (error) {
            console.log(error);
        }
    };

    const handleWithdraw = async (id) => {

        const confirmWithdraw = window.confirm(
            "Are you sure you want to withdraw this application?"
        );

        if (!confirmWithdraw) return;

        try {

            await API.delete(`/application/${id}`);

            toast.success(
                "Application withdrawn successfully!"
            );

            fetchApplications();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to withdraw application."
            );

        }

    };

    const total = applications.length;

    const pending = applications.filter(
        (app) => app.status === "Pending"
    ).length;

    const shortlisted = applications.filter(
        (app) => app.status === "Shortlisted"
    ).length;

    const selected = applications.filter(
        (app) => app.status === "Selected"
    ).length;

    const rejected = applications.filter(
        (app) => app.status === "Rejected"
    ).length;

    return (

        <div className="min-h-screen bg-gray-100 py-8 md:py-10">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-8">
                    My Dashboard
                </h1>

                {/* Statistics */}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <p className="text-gray-500 text-sm">
                            Applications
                        </p>

                        <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mt-2">
                            {total}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <p className="text-gray-500 text-sm">
                            Pending
                        </p>

                        <h2 className="text-2xl md:text-4xl font-bold text-yellow-500 mt-2">
                            {pending}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <p className="text-gray-500 text-sm">
                            Shortlisted
                        </p>

                        <h2 className="text-2xl md:text-4xl font-bold text-purple-600 mt-2">
                            {shortlisted}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <p className="text-gray-500 text-sm">
                            Selected
                        </p>

                        <h2 className="text-2xl md:text-4xl font-bold text-green-600 mt-2">
                            {selected}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                        <p className="text-gray-500 text-sm">
                            Rejected
                        </p>

                        <h2 className="text-2xl md:text-4xl font-bold text-red-600 mt-2">
                            {rejected}
                        </h2>
                    </div>

                </div>

                {/* Applications */}

                <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">

                    <h2 className="text-xl md:text-2xl font-semibold mb-6">
                        My Applications
                    </h2>

                    {applications.length === 0 ? (

                        <p className="text-gray-500">
                            You haven't applied for any internships yet.
                        </p>

                    ) : (

                        <div className="overflow-x-auto rounded-lg">

                            <table className="min-w-[700px] w-full">

                                <thead>

                                    <tr className="bg-blue-700 text-white">

                                        <th className="p-2 md:p-3 text-left">
                                            Company
                                        </th>

                                        <th className="p-2 md:p-3 text-left">
                                            Role
                                        </th>

                                        <th className="p-2 md:p-3 text-left">
                                            Status
                                        </th>

                                        <th className="p-2 md:p-3 text-left">
                                            Applied On
                                        </th>

                                        <th className="p-2 md:p-3 text-center">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map((application) => (

                                        <tr
                                            key={application._id}
                                            className="border-b hover:bg-gray-100"
                                        >

                                            <td className="p-2 md:p-3">
                                                {application.companyId?.companyName}
                                            </td>

                                            <td className="p-2 md:p-3">
                                                {application.companyId?.title}
                                            </td>

                                            <td className="p-2 md:p-3">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-sm
                                                    ${application.status === "Selected"
                                                            ? "bg-green-600"
                                                            : application.status === "Shortlisted"
                                                                ? "bg-purple-600"
                                                                : application.status === "Rejected"
                                                                    ? "bg-red-600"
                                                                    : "bg-yellow-500"
                                                        }`}
                                                >
                                                    {application.status}
                                                </span>

                                            </td>

                                            <td className="p-2 md:p-3">
                                                {new Date(
                                                    application.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="p-2 md:p-3 text-center">

                                                {application.status === "Pending" ? (

                                                    <button
                                                        onClick={() => handleWithdraw(application._id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-4 py-2 rounded-lg transition whitespace-nowrap"
                                                    >
                                                        Withdraw
                                                    </button>

                                                ) : (

                                                    <span className="text-gray-500 text-sm whitespace-nowrap">
                                                        Not Allowed
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
};

export default Dashboard;