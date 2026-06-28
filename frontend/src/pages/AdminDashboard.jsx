import {
    useEffect,
    useState,
    useContext,
} from "react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
    const { user } =
        useContext(AuthContext);
    const [stats, setStats] =
        useState({
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

            console.log("Dashboard Response:", res.data);

            setStats(res.data);
        } catch (error) {
            console.log("Dashboard Error:", error);
        }
    };

    if (user?.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin Dashboard</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2,1fr)",
                    gap: "20px",
                }}
            >
                <div>
                    <h3>
                        Total Students
                    </h3>
                    <p>
                        {stats.totalStudents}
                    </p>
                </div>

                <div>
                    <h3>
                        Total Internships
                    </h3>
                    <p>
                        {stats.totalCompanies}
                    </p>
                </div>

                <div>
                    <h3>
                        Total Applications
                    </h3>
                    <p>
                        {stats.totalApplications}
                    </p>
                </div>

                <div>
                    <h3>
                        Selected Candidates
                    </h3>

                    <p>
                        {stats.selectedStudents}
                    </p>
                </div>
            </div>
        </div>
    );

};

export default AdminDashboard;
