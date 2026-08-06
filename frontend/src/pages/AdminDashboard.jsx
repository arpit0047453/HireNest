import {
    useEffect,
    useState,
    useContext,
} from "react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const AdminDashboard = () => {

    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        totalApplications: 0,
        selectedStudents: 0,
        pending: 0,
        shortlisted: 0,
        rejected: 0,
        companyStats: [],
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
            <div className="text-center mt-20 text-2xl md:text-3xl font-bold text-red-600">
                Access Denied
            </div>
        );
    }

    const pieData = {
        labels: [
            "Pending",
            "Shortlisted",
            "Selected",
            "Rejected",
        ],
        datasets: [
            {
                data: [
                    stats.pending,
                    stats.shortlisted,
                    stats.selectedStudents,
                    stats.rejected,
                ],
                backgroundColor: [
                    "#EAB308",
                    "#9333EA",
                    "#16A34A",
                    "#DC2626",
                ],
            },
        ],
    };

    const barData = {
        labels: stats.companyStats.map(
            (company) => company.company
        ),
        datasets: [
            {
                label: "Applications",
                data: stats.companyStats.map(
                    (company) => company.count
                ),
                backgroundColor: "#2563EB",
            },
        ],
    };

    return (

        <div className="min-h-screen bg-gray-100 py-8 md:py-10">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-10">
                    Admin Dashboard
                </h1>

                {/* Statistics */}

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500 text-sm md:text-base">
                            Total Students
                        </h2>

                        <p className="text-2xl md:text-5xl font-bold text-blue-700 mt-4">
                            {stats.totalStudents}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500 text-sm md:text-base">
                            Total Internships
                        </h2>

                        <p className="text-2xl md:text-5xl font-bold text-green-600 mt-4">
                            {stats.totalCompanies}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500 text-sm md:text-base">
                            Total Applications
                        </h2>

                        <p className="text-2xl md:text-5xl font-bold text-purple-600 mt-4">
                            {stats.totalApplications}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition">

                        <h2 className="text-gray-500 text-sm md:text-base">
                            Selected Students
                        </h2>

                        <p className="text-2xl md:text-5xl font-bold text-orange-500 mt-4">
                            {stats.selectedStudents}
                        </p>

                    </div>

                </div>

                {/* Welcome */}

                <div className="mt-10 bg-white rounded-xl shadow-lg p-5 md:p-8">

                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        Welcome, Admin 👋
                    </h2>

                    <p className="text-gray-600 leading-7 text-sm md:text-base">
                        Use this dashboard to monitor internship listings,
                        student applications, and recruitment activity across
                        the HireNest platform. The statistics above provide a
                        quick overview of the current system.
                    </p>

                </div>

                {/* Charts */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-10">

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">

                        <h2 className="text-xl md:text-2xl font-semibold mb-6">
                            Application Status
                        </h2>

                        <div className="max-w-sm mx-auto">
                            <Pie data={pieData} />
                        </div>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">

                        <h2 className="text-xl md:text-2xl font-semibold mb-6">
                            Applications by Company
                        </h2>

                        <Bar
                            data={barData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />

                        <div className="h-72"></div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default AdminDashboard;