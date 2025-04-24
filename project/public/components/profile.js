const Profile = () => {
    const [profile, setProfile] = React.useState({
        name: '',
        email: '',
        rin: '',
        password: '',
    });
    const [error, setError] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);

    // Fetch profile data
    React.useEffect(() => {
        const valSession = async () => {
            try {

                const rinRes = await fetch('/session/rin', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                let session = await rinRes.json()

                if (session['sessionMissing']) {
                    //back to login
                    window.location.href = '/';
                } else {
                    return (session['rin']);
                }
            } catch (err) {
                console.error('Session Validation error:', err);
            }
        }

        const fetchProfile = async () => {
            const rin = await valSession();


            try {
               const response = await fetch(`https://syncboard.eastus.cloudapp.azure.com/node/profile/${rin}`);
               //local
               //  const response = await fetch(`http://localhost:3000/profile/${rin}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError("Failed to fetch profile");
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    // Handle form input changes
    //e is the element changing
    const handleChange = (e) => {
        const { name, value } = e.target; //e.target is dom element
        setProfile((prev) => ({ ...prev, [name]: value })); //keeps all other object as same properties, just redefines what changes 
    };

    // Handle form submission (update profile)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/profile/${profile.rin}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            setIsEditing(false);
        } catch (err) {
            setError("Failed to update profile");
            console.error(err);
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div>
            {/* <Homebar /> */}
            <div class="profile-maincontent">
                <h1 className="profile-title">Your Profile</h1>
                <div className="profile-container">
                    <div className="profile-header">
                    <div className="profile-img">
                        <div className="status-indicator"></div>
                    </div>
                        <div className="profile-info">
                            <div className="name">{profile.name}</div>
                            <div className="email">{profile.email}</div>
                        </div>
                    </div>

                    {/* Edit Form */}
                    {isEditing ? (

                        <form className="profile-form" onSubmit={handleSubmit}>
                            <div className="detail-row">
                                <label>Name:</label>
                                <input type="text" name="name" value={profile.name} onChange={handleChange} />
                            </div>
                            <div className="detail-row">
                                <label>Email:</label>
                                <input type="email" name="email" value={profile.email} onChange={handleChange} />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="edit-profile-btn-save">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="edit-profile-btn-cancel">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        // Display Profile Information
                        <div className="profile-details">
                            <div className="detail-row">
                                <span>Name</span>
                                <span>{profile.name}</span>
                            </div>
                            <hr />
                            <div className="detail-row">
                                <span>Email</span>
                                <span>{profile.email}</span>
                            </div>
                            <hr />
                            <div className="detail-row">
                                <span>RIN</span>
                                <span>{profile.rin}</span>
                            </div>
                            <hr />
                            <button onClick={() => setIsEditing(true)} className="edit-profile-btn-save">Edit Profile</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
