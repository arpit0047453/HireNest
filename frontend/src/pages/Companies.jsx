import { useEffect, useState } from "react";
import API from "../services/api";

const Companies = () => {
    const [companies, setCompanies] = useState([]);

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
                </div>
            ))}
        </div>
    );
};

export default Companies;