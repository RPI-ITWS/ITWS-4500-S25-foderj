// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
// const firebaseConfig = {

// };
  
// Initialize Firebase
//const app = initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const db = getFirestore(app);

// const app = firebase.initializeApp(firebaseConfig);
// console.log(app.name);
// const auth = getAuth(app);  // Firebase Authentication
// const provider = new GoogleAuthProvider();  // Google Auth Provider
  
const App = () => {
    //don't show the footer for messages
    const [showfooter, setshowfooter] = React.useState(true); 

    return (

        // Presents page based on whats currently in URL, loads into route 
        <ReactRouterDOM.BrowserRouter>
            <ReactRouterDOM.Route
                path="/"
                render={({ location }) => <Navbar location={location} />}
            />
            <div className="content">
                {/* Default route (this will be shown first when the app loads) */}

                <ReactRouterDOM.Route path="/node" exact component={Login} />
                <ReactRouterDOM.Route path="/node/signup" exact component={Signup} />
                <ReactRouterDOM.Route path="/node/workspace" exact component={Workspace} />

                {/* Define the route for /class */}
                <ReactRouterDOM.Route path="/node/class" exact component={Dashboard} />

                    {/* <ReactRouterDOM.Route path="/home/dashboard" component={Dashboard} /> */}
                    <ReactRouterDOM.Route path="/node/class/chat" component={Chat} />
                    <ReactRouterDOM.Route path="/node/class/resources" component={Resources} />
                    <ReactRouterDOM.Route path="/node/class/profile" render={() => <Profile name="Emily Chen"/>} />
            </div>
            <Footer />
        </ReactRouterDOM.BrowserRouter>
    );
};




const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
