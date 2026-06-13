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
                companyId: companyId,
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
                .includes(search.toLowerCase())
    );
    return (
        <div style={{ padding: "20px" }}>
            <h2>Internships</h2>
            <input
                type="text"
                placeholder="Search company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "8px",
                    width: "300px",
                    marginBottom: "20px",
                }}
            />

            <p>Total Companies: {filteredCompanies.length}</p>

            {filteredCompanies.map((company) => (
                <div
                    key={company._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>{company.companyName}</h3>

                    <p>
                        <strong>Role:</strong> {company.title}
                    </p>

                    <p>
                        <strong>Location:</strong> {company.location}
                    </p>

                    <p>
                        <strong>Stipend:</strong> {company.stipend}
                    </p>

                    <p>
                        <strong>Duration:</strong> {company.duration}
                    </p>

                    <p>
                        <strong>Description:</strong> {company.description}
                    </p>

                    <button
                        onClick={() => handleApply(company._id)}
                    >
                        Apply
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Companies;