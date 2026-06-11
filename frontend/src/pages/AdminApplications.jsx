import { useEffect, useState } from "react";
import API from "../services/api";

const AdminApplications = () => {
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

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/application/${id}`, {
                status,
            });

            fetchApplications();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Manage Applications</h2>

            {applications.map((application) => (
                <div
                    key={application._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>{application.studentName}</h3>

                    <p>
                        Company:
                        {" "}
                        {application.companyId?.companyName}
                    </p>

                    <p>
                        Status:
                        {" "}
                        {application.status}
                    </p>

                    <select
                        value={application.status}
                        onChange={(e) =>
                            updateStatus(
                                application._id,
                                e.target.value
                            )
                        }
                    >
                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Shortlisted">
                            Shortlisted
                        </option>

                        <option value="Selected">
                            Selected
                        </option>

                        <option value="Rejected">
                            Rejected
                        </option>
                    </select>
                </div>
            ))}
        </div>
    );

};

export default AdminApplications;
