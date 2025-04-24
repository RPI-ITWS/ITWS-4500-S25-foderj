function addSpace(name){
    if (name.includes("%20")){
        return name.replace(/%20/g, " ");
    }
    return name
}

const groupid = getCookie('groupid');

const Message = ({ message }) => {
    const newName = addSpace(message.name);
    const [rin, setRin] = React.useState(null);
    const [userColors, setUserColors] = React.useState(new Map());

    const colors = ["--yellow","--blue","--lightyellow", "--lightblue"];

    React.useEffect(() => {
      // get the rins for the group and assign them colors in a map to display different color for user in messages
      const mapColors = async () => {
        const groupInfo = await fetch(`/groups/${groupid}`, {method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json' }});
        const response = await groupInfo.json();

        let colorMap = new Map();
        response.students.forEach((student, index) => {
          colorMap.set(student, colors[index % colors.length]);
        });
        setUserColors(new Map(colorMap));
      };
      mapColors();
      
      const getRin = async () => {
        try {
          const rinRes = await fetch('/session/rin', {method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json' }});
          const session = await rinRes.json();
  
          if (session.sessionMissing) {
            //back to login
            window.location.href = '/';
          } else {
            setRin(session.rin);
          }
        } catch (err) {
          console.error('Session Validation error:', err);
        }
      };
  
      getRin();
    }, []);

    const getColor = (messagerin) => {
      if (String(messagerin) !== String(rin)) {
        const color = `var(${userColors.get(Number(messagerin))})`;
        return color;
      }
      return 'var(--offwhite)'; 
    };
  
    
    return (
      <div
        className={`chat-bubble ${String(message.rin) === String(rin) ? "right" : ""}`}
        style={String(message.rin) !== String(rin) ? { backgroundColor: getColor(message.rin) } : {}}>
        <img
          className="chat-bubble__left"
          src={"../userProfile.jpeg"}
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name">{newName}</p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>
    );
};