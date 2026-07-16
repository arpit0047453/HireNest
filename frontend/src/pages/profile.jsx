import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [resumeFile, setResumeFile] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        skills: "",
        github: "",
        linkedin: "",
        bio: "",
        resumeUrl: "",
    });

    const handleResumeChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const res = await API.get(`/profile/${user.email}`);

            if (res.data) {
                setFormData(res.data);
            } else {
                setFormData({
                    email: user.email,
                    name: user.name,
                    phone: "",
                    skills: "",
                    github: "",
                    linkedin: "",
                    bio: "",
                    resumeUrl: "",
                });
            }
        } catch (error) {
            console.log(error);

            setFormData({
                email: user.email,
                name: user.name,
                phone: "",
                skills: "",
                github: "",
                linkedin: "",
                bio: "",
                resumeUrl: "",
            });
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
            let updatedFormData = {
                ...formData,
            };

            if (resumeFile) {
                const data = new FormData();

                data.append("resume", resumeFile);

                const uploadRes = await API.post(
                    "/upload/resume",
                    data
                );

                updatedFormData.resumeUrl =
                    uploadRes.data.resumeUrl;
            }

            await API.post(
                "/profile",
                updatedFormData
            );

            alert("Profile saved successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to save profile");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
                    Student Profile
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (React, Node.js...)"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="text"
                        name="github"
                        placeholder="GitHub Profile"
                        value={formData.github}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn Profile"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <textarea
                        name="bio"
                        placeholder="Tell us about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <div>

                        <label className="font-semibold">
                            Upload Resume (PDF)
                        </label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleResumeChange}
                            className="mt-2"
                        />

                    </div>

                    {formData.resumeUrl && (

                        <a
                            href={formData.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            📄 View Uploaded Resume
                        </a>

                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Save Profile
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Profile;