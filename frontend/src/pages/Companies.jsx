import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [applyingId, setApplyingId] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {

        try {

            setLoading(true);

            const res = await API.get("/company");

            setCompanies(res.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleApply = async (companyId) => {

        try {

            setApplyingId(companyId);

            await API.post("/application", {
                studentName: user.name,
                studentEmail: user.email,
                companyId,
            });

            toast.success("Application submitted successfully!");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Application Failed!"
            );

        } finally {

            setApplyingId(null);

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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <p className="text-center text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10">
                    Browse internships from top companies, explore opportunities,
                    and apply with a single click to kickstart your career.
                </p>

                <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-4">

                    <input
                        type="text"
                        placeholder="🔍 Search company, role or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full lg:w-96 border rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="bg-white w-full lg:w-auto px-6 py-3 rounded-lg shadow text-center">
                        <span className="font-semibold">
                            📊 Total Internships:
                        </span>{" "}
                        {filteredCompanies.length}
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                    {filteredCompanies.map((company) => (

                        <div
                            key={company._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 sm:p-6 border border-gray-100"
                        >

                            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                                🏢 {company.companyName}
                            </h2>

                            <span className="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
                                💼 {company.title}
                            </span>
                            <div className="space-y-2 text-sm sm:text-base text-gray-700">

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

                                <p className="text-sm sm:text-base text-gray-600">
                                    {company.description}
                                </p>

                            </div>

                            <button
                                onClick={() => handleApply(company._id)}
                                disabled={applyingId === company._id}
                                className="mt-6 w-full bg-blue-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm sm:text-base font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                {
                                    applyingId === company._id
                                        ? "Applying..."
                                        : "🚀 Apply Now"
                                }
                            </button>

                            <button
                                onClick={() => navigate(`/companies/${company._id}`)}
                                className="mt-3 w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm sm:text-base font-semibold py-3 rounded-xl transition"
                            >
                                View Details
                            </button>

                        </div>

                    ))}

                </div>

                {filteredCompanies.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-center mt-10">

                        <div className="text-5xl sm:text-6xl mb-4">
                            🔍
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                            No internships found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            We couldn't find any internships matching your search.
                        </p>

                        <button
                            onClick={() => setSearch("")}
                            className="mt-6 w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Clear Search
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
};

export default Companies;