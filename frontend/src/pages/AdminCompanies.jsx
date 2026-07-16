import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminCompanies = () => {
    const { user } = useContext(AuthContext);

    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        companyName: "",
        title: "",
        location: "",
        stipend: "",
        duration: "",
        description: "",
    });

    const [editingId, setEditingId] = useState(null);

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await API.put(`/company/${editingId}`, formData);
                alert("Internship updated!");
            } else {
                await API.post("/company", formData);
                alert("Internship created!");
            }

            setFormData({
                companyName: "",
                title: "",
                location: "",
                stipend: "",
                duration: "",
                description: "",
            });

            setEditingId(null);

            fetchCompanies();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (company) => {
        setEditingId(company._id);

        setFormData({
            companyName: company.companyName,
            title: company.title,
            location: company.location,
            stipend: company.stipend,
            duration: company.duration,
            description: company.description,
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this internship?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/company/${id}`);

            alert("Deleted successfully");

            fetchCompanies();
        } catch (error) {
            console.log(error);
        }
    };

    if (user?.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-4xl font-bold text-blue-700 mb-8">
                    Internship Management
                </h1>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-10">

                    <h2 className="text-2xl font-semibold mb-6">
                        {editingId
                            ? "Update Internship"
                            : "Create Internship"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 gap-5"
                    >

                        <input
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="title"
                            placeholder="Role"
                            value={formData.title}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="stipend"
                            placeholder="Stipend"
                            value={formData.stipend}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                        />

                        <input
                            name="duration"
                            placeholder="Duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-3"
                        />

                        <div></div>

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="border rounded-lg px-4 py-3 md:col-span-2"
                        />

                        <button
                            type="submit"
                            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            {editingId
                                ? "Update Internship"
                                : "Create Internship"}
                        </button>

                    </form>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                    <h2 className="text-2xl font-semibold">
                        All Internships
                    </h2>

                    <input
                        type="text"
                        placeholder="Search by Company, Role or Location..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="border rounded-lg px-4 py-3 w-full md:w-96"
                    />

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies
                        .filter((company) => {
                            const search = searchTerm.toLowerCase();

                            return (
                                (company.companyName || "")
                                    .toLowerCase()
                                    .includes(search) ||
                                (company.title || "")
                                    .toLowerCase()
                                    .includes(search) ||
                                (company.location || "")
                                    .toLowerCase()
                                    .includes(search)
                            );
                        })
                        .map((company) => (
                            <div
                                key={company._id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                            >
                                <h3 className="text-xl font-bold text-blue-700 mb-3">
                                    {company.companyName}
                                </h3>

                                <p className="mb-2">
                                    <strong>Role:</strong> {company.title}
                                </p>

                                <p className="mb-2">
                                    <strong>Location:</strong> {company.location}
                                </p>

                                <p className="mb-2">
                                    <strong>Stipend:</strong> {company.stipend}
                                </p>

                                <p className="mb-2">
                                    <strong>Duration:</strong> {company.duration}
                                </p>

                                <p className="mb-5 text-gray-600">
                                    {company.description}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(company)}
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(company._id)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
};

export default AdminCompanies;