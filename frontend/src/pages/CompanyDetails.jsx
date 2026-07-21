import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const CompanyDetails = () => {
    const { id } = useParams();

    const [company, setCompany] = useState(null);

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {
        try {
            const res = await API.get("/company");

            const found = res.data.find(
                (item) => item._id === id
            );

            setCompany(found);
        } catch (error) {
            console.log(error);
        }
    };

    if (!company) {
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-4xl font-bold text-blue-700 mb-4">
                    🏢 {company.companyName}
                </h1>

                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                    {company.title}
                </span>

                <div className="space-y-4 text-lg">

                    <p>
                        📍 <strong>Location:</strong> {company.location}
                    </p>

                    <p>
                        💰 <strong>Stipend:</strong> {company.stipend}
                    </p>

                    <p>
                        ⏳ <strong>Duration:</strong> {company.duration}
                    </p>

                    <div>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">
                            Description
                        </h2>

                        <p className="text-gray-700">
                            {company.description}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default CompanyDetails;