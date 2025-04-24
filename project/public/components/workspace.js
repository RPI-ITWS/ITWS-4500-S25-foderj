/* ONLY WORKS WITH 3 CLASSES MAX FOR RIGHT NOW DUE TO COLOR */

const Workspace = () => {

    //workspaces initialized to empty array , this represents the array of courses the student is in 
    const [workspaces, setWorkspaces] = React.useState([]);

    const colors = ["--coral", "--yellow", "--blue"];

    //runs on mount and when dependecies in dependency array change (there are none)
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
                    return (session['rin'])
                }
            } catch (err) {
                console.error('Session Validation error:', err);
            }
        }


      //uses groups to present what classes the student is in as there is no 'group homepage' if you are not in a good 
      const fetchGroups = async () =>{
         let rin = await valSession();
         fetch(`/classes/${rin}`, { method: 'GET' })
         .then(response=>response.json())
         .then(data => {
            setWorkspaces(data);
         });
         
      }
      fetchGroups(); 

    }, []);

    return (
        <div id="work-Holder">
            <h1 id="work-header">Your Workspaces</h1>

            <div className="workspaces">
                {workspaces.map((course, i) => (
                    <Card
                        key={i}
                        title={course['className']}
                        coursecode={course['prefix'] + '-' + course['coursecode']}
                        crn={course['crn']}
                        color={colors[i]}
                    />
                ))}

            </div>
        </div>

    );
};
