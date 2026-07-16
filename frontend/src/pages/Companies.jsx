import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const res = await API.get("/company");
            setCompanies(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleApply = async (companyId) => {
        try {
            await API.post("/application", {
                studentName: user.name,
                studentEmail: user.email,
                companyId,
            });

            alert("Application submitted successfully!");
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Application failed!"
            );
        }
    };

    const filteredCompanies = companies.filter(
        (company) =>
            (company.companyName || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            (company.title || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            (company.location || "")
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
                    Available Internships
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                    <input
                        type="text"
                        placeholder="Search company, role or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-96 border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="bg-white px-6 py-3 rounded-lg shadow">
                        <span className="font-semibold">
                            Total Internships:
                        </span>{" "}
                        {filteredCompanies.length}
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredCompanies.map((company) => (

                        <div
                            key={company._id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
                        >

                            <h2 className="text-2xl font-bold text-blue-700 mb-2">
                                {company.companyName}
                            </h2>

                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
                                {company.title}
                            </span>

                            <div className="space-y-2 text-gray-700">

                                <p>
                                    📍 <strong>Location:</strong>{" "}
                                    {company.location}
                                </p>

                                <p>
                                    💰 <strong>Stipend:</strong>{" "}
                                    {company.stipend}
                                </p>

                                <p>
                                    ⏳ <strong>Duration:</strong>{" "}
                                    {company.duration}
                                </p>

                                <p>
                                    📝 <strong>Description:</strong>
                                </p>

                                <p className="text-gray-600">
                                    {company.description}
                                </p>

                            </div>

                            <button
                                onClick={() => handleApply(company._id)}
                                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                            >
                                Apply Now
                            </button>

                        </div>

                    ))}

                </div>

                {filteredCompanies.length === 0 && (
                    <div className="text-center mt-20">

                        <h2 className="text-2xl font-semibold text-gray-600">
                            No internships found.
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try searching with another keyword.
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
};

export default Companies;