import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

const Profile = () => {
    const { user } = useContext(AuthContext);

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
            await API.post("/profile", formData);
            alert("Profile saved successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to save profile");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Student Profile</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                />

                <br /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="skills"
                    placeholder="Skills"
                    value={formData.skills}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="github"
                    placeholder="GitHub"
                    value={formData.github}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn"
                    value={formData.linkedin}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={formData.bio}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="resumeUrl"
                    placeholder="Resume URL"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Save Profile
                </button>
            </form>
        </div>
    );

};

export default Profile;
