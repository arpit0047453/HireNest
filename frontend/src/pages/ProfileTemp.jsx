import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { toast } from "react-toastify";

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
    const fields = [
        formData.name,
        formData.phone,
        formData.skills,
        formData.github,
        formData.linkedin,
        formData.bio,
        formData.resumeUrl,
    ];

    const completed = fields.filter(
        (item) => item && item.trim() !== ""
    ).length;

    const percentage = Math.round(
        (completed / fields.length) * 100
    );

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

            toast.success("Profile saved successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to save profile");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
                    Student Profile
                </h1>
                <div className="mb-8">

                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">
                            Profile Completion
                        </span>

                        <span className="text-blue-700 font-bold">
                            {percentage}%
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4">

                        <div
                            className="bg-blue-600 h-4 rounded-full"
                            style={{ width: `${percentage}%` }}
                        ></div>

                    </div>

                </div>

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
                            className="mt-2 w-full border rounded-lg p-3"
                        />

                        {resumeFile && (

                            <p className="text-green-600 mt-2">
                                Selected:
                                <strong> {resumeFile.name}</strong>
                            </p>

                        )}

                    </div>

                    {formData.resumeUrl && (

                        <a
                            href={formData.resumeUrl}
                            className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition"
                            target="_blank"
                            rel="noreferrer"
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