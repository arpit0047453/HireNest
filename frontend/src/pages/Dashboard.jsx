import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchApplications();
    }, []);

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

    const total = applications.length;

    const pending = applications.filter(
        (app) => app.status === "Pending"
    ).length;

    const accepted = applications.filter(
        (app) => app.status === "Accepted"
    ).length;

    const rejected = applications.filter(
        (app) => app.status === "Rejected"
    ).length;

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-blue-700 mb-8">
                    Student Dashboard
                </h1>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-gray-500">
                            Total Applications
                        </h2>

                        <p className="text-4xl font-bold text-blue-700 mt-3">
                            {total}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-gray-500">
                            Pending
                        </h2>

                        <p className="text-4xl font-bold text-yellow-500 mt-3">
                            {pending}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-gray-500">
                            Accepted
                        </h2>

                        <p className="text-4xl font-bold text-green-600 mt-3">
                            {accepted}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-gray-500">
                            Rejected
                        </h2>

                        <p className="text-4xl font-bold text-red-600 mt-3">
                            {rejected}
                        </p>
                    </div>

                </div>

                {/* Applications */}

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h2 className="text-2xl font-semibold mb-6">
                        My Applications
                    </h2>

                    {applications.length === 0 ? (
                        <p className="text-gray-500">
                            You haven't applied for any internships yet.
                        </p>
                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full border-collapse">

                                <thead>

                                    <tr className="bg-blue-700 text-white">

                                        <th className="p-3 text-left">
                                            Company
                                        </th>

                                        <th className="p-3 text-left">
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map((application) => (

                                        <tr
                                            key={application._id}
                                            className="border-b hover:bg-gray-100"
                                        >

                                            <td className="p-3">
                                                {application.companyId?.companyName}
                                            </td>

                                            <td className="p-3">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-sm ${application.status === "Accepted"
                                                        ? "bg-green-600"
                                                        : application.status === "Rejected"
                                                            ? "bg-red-600"
                                                            : "bg-yellow-500"
                                                        }`}
                                                >
                                                    {application.status}
                                                </span>

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