import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminApplications = () => {
    const { user } = useContext(AuthContext);

    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");

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
                                    `/profile/${application.studentEmail}`
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

    if (user?.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    const filteredApplications = applications.filter((application) => {
        const value = search.toLowerCase();

        return (
            (application.studentName || "")
                .toLowerCase()
                .includes(value) ||
            (application.studentEmail || "")
                .toLowerCase()
                .includes(value) ||
            (application.companyId?.companyName || "")
                .toLowerCase()
                .includes(value)
        );
    });

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-700">
                        Manage Applications
                    </h1>

                    <input
                        type="text"
                        placeholder="Search Candidate..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="border rounded-lg px-4 py-3 w-full md:w-80 mt-4 md:mt-0"
                    />
                </div>

                <p className="mb-6 text-gray-600">
                    Total Applications :
                    <strong> {filteredApplications.length}</strong>
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredApplications.map((application) => (

                        <div
                            key={application._id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                        >

                            <h2 className="text-2xl font-bold text-blue-700 mb-4">
                                {application.studentName}
                            </h2>

                            <p className="mb-2">
                                <strong>Email:</strong>{" "}
                                {application.studentEmail}
                            </p>

                            <p className="mb-2">
                                <strong>Company:</strong>{" "}
                                {application.companyId?.companyName}
                            </p>

                            <p className="mb-4">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-3 py-1 rounded-full text-white text-sm
                                    ${application.status === "Selected"
                                            ? "bg-green-600"
                                            : application.status === "Rejected"
                                                ? "bg-red-600"
                                                : application.status === "Shortlisted"
                                                    ? "bg-yellow-500"
                                                    : "bg-gray-500"
                                        }`}
                                >
                                    {application.status}
                                </span>
                            </p>

                            {application.resumeUrl && (
                                <a
                                    href={application.resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block mb-4 text-blue-600 hover:underline"
                                >
                                    📄 View Resume
                                </a>
                            )}

                            <select
                                value={application.status}
                                onChange={(e) =>
                                    updateStatus(
                                        application._id,
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg p-3"
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

            </div>
        </div>
    );
};

export default AdminApplications;