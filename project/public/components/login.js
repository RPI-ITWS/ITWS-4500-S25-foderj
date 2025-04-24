const Login = () => {
  const [email, setEmail] = React.useState(''); //email is set everytime input box changes 
  const [password, setPassword] = React.useState('');

    const handleSignIn = async () => {
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            //calls our API -> note there is no URL at this point so we are fin e
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            //response was in teh 200's 
            if (response.ok) {
                window.location.href = '/workspace'; // Redirect to home page
            } else {
                //if there is a  
                alert(data.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="welcome-text">Welcome to SyncBoard!</div>
            <div className="login-container">
                <div className="login-title">Log In</div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="sign-in-btn" onClick={handleSignIn}>
                    Sign In
                </button>
                <ReactRouterDOM.Link to="/signup">
                    <button
                        className="sign-up-btn"
                    >

                        Don’t have an account? Sign up now!
                    </button>
                </ReactRouterDOM.Link>
            </div>
        </div>
    );
};


