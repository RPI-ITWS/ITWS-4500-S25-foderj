const Dashboard = () => {
    const [groupName, setGroupName] = React.useState('');
    const [className, setClassName] = React.useState('');
    const [crn, setCrn] = React.useState('');
    const [workspaces, setWorkspaces] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Validate session and get RIN
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

                // Get group ID from session
                const groupRes = await fetch('/session/groupID', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const groupSession = await groupRes.json();
                const groupid = groupSession.groupid;

                // Fetch group details
                const groupInfoRes = await fetch(`/groups/${groupid}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const groupInfo = await groupInfoRes.json();
                setGroupName(groupInfo.groupName);
                setCrn(groupInfo.crn);

                // Fetch workspaces using RIN
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
                console.error('Error loading dashboard data:', err);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <Homebar />
            <div className="dashboard-name">
                <h1>
                    {className && groupName
                        ? `${className}: ${groupName}`
                        : 'Loading team name...'}
                </h1>
            </div>
            <div className="mainContent">
                <div className="left">
                    <h2>Team Calendar</h2>
                    <div className="fullCal-component">
                        <CalendarComponent />
                    </div>
                </div>

                <div className="right">
                    <h2>Tasks</h2>
                    <Tasks />
                </div>
            </div>
        </div>
    );
};
