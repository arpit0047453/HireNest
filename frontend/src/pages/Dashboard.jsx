import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await API.get("/application");
            setApplications(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>My Applications</h2>

            {applications.map((application) => (
                <div
                    key={application._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>
                        {application.companyId?.companyName}
                    </h3>

                    <p>
                        Status: {application.status}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;