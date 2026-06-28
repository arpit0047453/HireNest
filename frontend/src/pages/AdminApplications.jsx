import {
    useEffect,
    useState,
    useContext,
} from "react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await API.get("/application");

            const applicationsWithResume =
                await Promise.all(
                    res.data.map(async (application) => {
                        try {
                            const profileRes =
                                await API.get(
                                    `/ profile / ${application.studentEmail} `
                                );

                            return {
                                ...application,
                                resumeUrl:
                                    profileRes.data?.resumeUrl || "",
                            };
                        } catch {
                            return application;
                        }
                    })
                );

            setApplications(applicationsWithResume);
        } catch (error) {
            console.log(error);
        }
    };

    if (user?.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/ application / ${id} `, {
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
                        Company:{" "}
                        {application.companyId?.companyName}
                    </p>

                    <p>
                        Status:{" "}
                        <strong>
                            {application.status}
                        </strong>
                    </p>

                    {application.resumeUrl && (
                        <p>
                            <a
                                href={application.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Resume
                            </a>
                        </p>
                    )}

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
