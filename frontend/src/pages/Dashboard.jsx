import { useEffect, useState } from "react";
import API from "../services/api";
import { useContext } from "react";
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