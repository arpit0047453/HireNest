const Profile = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Student Profile</h2>

            <form>
                <div>
                    <label>Name</label>
                    <br />
                    <input type="text" />
                </div>

                <br />

                <div>
                    <label>Phone</label>
                    <br />
                    <input type="text" />
                </div>

                <br />

                <div>
                    <label>Skills</label>
                    <br />
                    <input type="text" />
                </div>

                <br />

                <div>
                    <label>GitHub</label>
                    <br />
                    <input type="text" />
                </div>

                <br />

                <div>
                    <label>LinkedIn</label>
                    <br />
                    <input type="text" />
                </div>

                <br />

                <button>
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;