const Signup = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        rin: '',
        year: '',
        major: '',
        password: ''
    });

    //as of rn, year and major not stores 

    const handleChange = (e) => {
        //gets the id of the form data being submitted and the value
        const { id, value } = e.target;
        //Copies what is already in there for all other value fields except ID. 
        setFormData({ ...formData, [id]: window.escapeHTML(value) });
    };

    const handleSubmit = async (e) => {
        //no reload 
        e.preventDefault();

        //add in signup requirements because that should be client side
        /*
        Password must be: 
           - at least 8 characters
           - have at least one number 
           - at least one special character 
        */

        if (formData['password'].length < 8) {
            alert("Password must be at least 8 characters")
            return
        } else if (!(/\d/.test(formData['password']))) { //regex to test if password contains a digit
            alert("Password must have at least one number")
            return
        } else if (!(/[!@#$%^&*(),.?:{}|<>]/.test(formData['password']))) { //regex to test if password contains at least one of those special characters
            alert("Password must include at least one of these special characters:\n!@#$%^&*(),.?:{}|<>")
            return
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful! Redirecting to login...');
                window.location.href = '/';
            } else {
                alert(`Signup failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container-signup">
            <div className="welcome-text">Welcome to SyncBoard!</div>
            <form className="signup-container" onSubmit={handleSubmit}>
                <div className="login-title">Sign Up</div>
                {['name', 'email', 'rin', 'password'].map((field, index) => (
                    <div className="input-group" key={index}>
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            id={field}
                            placeholder={`Enter your ${field}`}
                            value={formData[field]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button className="sign-in-btn" type="submit">Sign Up</button>
                <ReactRouterDOM.Link to="/">
                    <button className="sign-up-btn" type="button">
                        Already have an account? Log in!
                    </button>
                </ReactRouterDOM.Link>
            </form>
        </div>
    );
};

