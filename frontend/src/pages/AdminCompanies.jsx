import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminCompanies = () => {
    const { user } = useContext(AuthContext);

    const [companies, setCompanies] = useState([]);

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
                await API.put(
                    `/ company / ${editingId} `,
                    formData
                );

                alert("Internship updated!");
            } else {
                await API.post(
                    "/company",
                    formData
                );

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
        const confirmDelete =
            window.confirm(
                "Delete this internship?"
            );

        if (!confirmDelete) return;

        try {
            await API.delete(`/ company / ${id} `);

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
        <div style={{ padding: "20px" }}>
            <h2>Admin Internship Management</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="title"
                    placeholder="Role"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="stipend"
                    placeholder="Stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="duration"
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    {editingId
                        ? "Update Internship"
                        : "Create Internship"}
                </button>
            </form>

            <hr />

            <h3>All Internships</h3>

            {companies.map((company) => (
                <div
                    key={company._id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h4>
                        {company.companyName}
                    </h4>

                    <p>{company.title}</p>

                    <button
                        onClick={() =>
                            handleEdit(company)
                        }
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                            handleDelete(company._id)
                        }
                        style={{
                            marginLeft: "10px",
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );

};

export default AdminCompanies;
