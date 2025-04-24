const Navbar = (props) => {

    //hooks
    const [loggedIn, setLoggedIn] = React.useState(false);

    const pathname = props.location.pathname;
    const isAuthPage = pathname === "/" || pathname === "/signup";

    const handleLogOut = async () => {

        try {
            //calls our API -> note there is no URL at this point so we are fin e
            const response = await fetch('/logout', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });


            //response was in teh 200's 
            if (response.ok) {
                window.location.href = '/';
            } else {
                //if there is an issue
                alert("fetch call to logout specifications incorrect");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    //weather or not login or logout appears 
    React.useEffect(() => {
        const valSession = async () => {
            try {

                const rinRes = await fetch('/node/session/rin', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                let session = await rinRes.json()

                if (session['sessionMissing']) {

                    setLoggedIn(false);
                } else {

                    setLoggedIn(true);
                }
            } catch (err) {
                console.error('Session Validation error:', err);
            }
        }

        valSession();
        // console.log(notLoggedIn)



    }, []);
    return (
        <nav className="navbar">
            <ReactRouterDOM.Link to="/workspace">
                <div className="logo">
                    <span className="logo-full">SyncBoard</span>
                    <span className="logo-short">SB</span>
                </div>
            </ReactRouterDOM.Link>

            {!isAuthPage && (
                <div className="main-menu">
                    <ReactRouterDOM.Link to="/workspace">Home</ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to="/class/profile">Profile</ReactRouterDOM.Link>
                    {loggedIn && (
                        <div onClick={handleLogOut} className="logout">
                            Logout
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};