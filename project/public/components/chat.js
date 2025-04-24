const Chat = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [classID, setClassID] = React.useState(null);
  const [workspaces, setWorkspaces] = React.useState([]);
  const [className, setClassName] = React.useState('');
  const [groupName, setGroupName] = React.useState('');
  const [groupID, setGroupID] = React.useState(null);

  // Validate session on mount
  React.useEffect(() => {
    const validateSession = async () => {
      try {
        const rinRes = await fetch('/session/rin', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const session = await rinRes.json();

        if (session.sessionMissing) {
          window.location.href = '/';
        }
      } catch (err) {
        console.error('Session validation error:', err);
      }
    };
    validateSession();
  }, []);

  // Get the group ID from the session
  React.useEffect(() => {
    const fetchGroupID = async () => {
      try {
        const rinRes = await fetch('/session/rin', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const session = await rinRes.json();
        if (session['sessionMissing']) {
          window.location.href = '/';
          return;
        }
        const rin = session.rin;

        const res = await fetch('/session/groupID', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.error) {
          console.error('Error fetching group ID:', data.error);
        } else {
          setGroupID(data.groupid);
        }
      } catch (err) {
        console.error('Group ID fetch error:', err);
      }
    };

    fetchGroupID();
  }, []); // Only run once on mount

  // This effect runs when groupID is set
  React.useEffect(() => {
    if (!groupID) return;  // If groupID is null or undefined, exit early.

    const fetchGroupDetails = async () => {
      try {
        const groupInfoRes = await fetch(`/groups/${groupID}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const groupInfo = await groupInfoRes.json();
        setGroupName(groupInfo.groupName);
        setClassID(groupInfo.crn);

        // Fetch workspaces using RIN
        const rinRes = await fetch('/session/rin', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const session = await rinRes.json();
        const rin = session.rin;

        const classesRes = await fetch(`/classes/${rin}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const classesData = await classesRes.json();
        setWorkspaces(classesData);

        // Find the class that matches the crn
        const matchedClass = classesData.find(cls => cls.crn === groupInfo.crn);
        if (matchedClass) {
          setClassName(matchedClass.className);
        }
      } catch (err) {
        console.error('Error fetching group details or classes:', err);
      }
    };

    fetchGroupDetails();
  }, [groupID]); // This effect runs whenever groupID is updated

  React.useEffect(() => {
    const signInAnonymouslyAndCheckCookies = async () => {
      try {

        //create uid 
        const userCredential = await window.signInAnonymously(window.firebaseAuth);
        const user = userCredential.user;

        // Save user info into cookies for later use
        const expiryDays = 7;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + expiryDays);

        document.cookie = `uid=${encodeURIComponent(user.uid)}; expires=${expiryDate.toUTCString()}; path=/`;
       
        setIsLoggedIn(true);
        // alert("You are logged in!");
        
      } catch (error) {
        // If user is not signed in and cookies don't have user info, check cookies
        const uid = getCookie("uid");
        if (uid) {
          console.log("Cookie:", uid);
          setIsLoggedIn(true);
          alert("You are logged in from cookies!");
        } else {
          console.error("Error with anonymous sign-in:", error);
          alert("Could not sign in anonymously. Please try again.");
        }
      }
    };

    signInAnonymouslyAndCheckCookies();
  }, []);

  return (
    <div className="App">
      <Homebar />
      <div class="group-class-info">
        <h1>
            {className && groupName
              ? `${className}: ${groupName}`
              : 'Loading team name...'}
          </h1>
      </div>
      {isLoggedIn ? (<ChatBox />) : (<div>Fetching chat logs</div>)}
    </div>
  );
};




// const Chat = () => {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);

//   React.useEffect(() => {
//     const checkRedirect = async () => {
//       try {
//         console.log("Tester!");
//         const result = await window.getRedirectResult(window.firebaseAuth);
//         console.log("Result: " + result);
//         if (result && result.user) {
//           const user = result.user;

//           const expiryDays = 7;
//           const expiryDate = new Date();
//           expiryDate.setDate(expiryDate.getDate() + expiryDays);
      
//           //save user info into cookies
//           document.cookie = `uid=${encodeURIComponent(user.uid)}; expires=${expiryDate.toUTCString()}; path=/`;
//           document.cookie = `name=${encodeURIComponent(user.displayName)}; expires=${expiryDate.toUTCString()}; path=/`;        
//           document.cookie = `email=${encodeURIComponent(user.email)}; expires=${expiryDate.toUTCString()}; path=/`;
//           document.cookie = `photoURL=${encodeURIComponent(user.photoURL)}; expires=${expiryDate.toUTCString()}; path=/`;
//           document.cookie = `accessToken=${encodeURIComponent(user.accessToken)}; expires=${expiryDate.toUTCString()}; path=/`;
//           document.cookie = `refreshToken=${encodeURIComponent(user.stsTokenManager.refreshToken)}; expires=${expiryDate.toUTCString()}; path=/`;
          
//           setIsLoggedIn(true);
//           alert("You are logged in!")
//         } else {
//           const uid = getCookie("uid");
//           if (uid) {
//             console.log("Cookie:", uid);
//             //tester
//             console.log(getCookie("photoURL"));
//             setIsLoggedIn(true);
//             alert("You are logged in!")
//           }
//         }
//       } catch (error) {
//         console.error("getRedirectResult error:", error);
//       }
//     };

//     checkRedirect();
//   }, []);


//   return (
//     <div className="App">
//       {/* {isLoggedIn ? (<ChatBox />) : (<Auth onLogin={() => setIsLoggedIn(true)} />)} */}
//       {isLoggedIn ? (<ChatBox />) : (<Auth />)}
//     </div>
//   );
// };