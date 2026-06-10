import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
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
    return (
        <div style={{ padding: "20px" }}>
            <h2>Internships</h2>

            {companies.map((company) => (
                <div
                    key={company._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>{company.companyName}</h3>

                    <p>{company.role}</p>

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