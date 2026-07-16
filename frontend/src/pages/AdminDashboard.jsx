import {
    useEffect,
    useState,
    useContext,
} from "react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        totalApplications: 0,
        selectedStudents: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await API.get("/dashboard");
            setStats(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (user?.role !== "admin") {
        return (
            <div className="text-center mt-20 text-3xl font-bold text-red-600">
                Access Denied
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-4xl font-bold text-blue-700 mb-10">
                    Admin Dashboard
                </h1>

                {/* Statistics Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500">
                            Total Students
                        </h2>

                        <p className="text-5xl font-bold text-blue-700 mt-4">
                            {stats.totalStudents}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500">
                            Total Internships
                        </h2>

                        <p className="text-5xl font-bold text-green-600 mt-4">
                            {stats.totalCompanies}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500">
                            Total Applications
                        </h2>

                        <p className="text-5xl font-bold text-purple-600 mt-4">
                            {stats.totalApplications}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500">
                            Selected Students
                        </h2>

                        <p className="text-5xl font-bold text-orange-500 mt-4">
                            {stats.selectedStudents}
                        </p>

                    </div>

                </div>

                {/* Welcome Card */}

                <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        Welcome, Admin 👋
                    </h2>

                    <p className="text-gray-600 leading-7">
                        Use this dashboard to monitor internship listings,
                        student applications, and recruitment activity across
                        the HireNest platform. The statistics above provide a
                        quick overview of the current system.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;