//another note to self, delete the footer from the content page
const SendMessage = () => {
    const [message, setMessage] = React.useState("");
    var name = "";

    const getRin = async ()=> {
      try{

         const rinRes = await fetch('/session/rin', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
         });
         let session = await rinRes.json()
            
         if(session['sessionMissing']){
            //back to login
            window.location.href = '/';
         }else{
            return(session['rin'])
         }
      }catch(err){   
         console.error('Session Validation error:', err);
      }
   }

   const getName = async () => {
    const rin = await getRin();
        try {
            const response = await fetch(`/profile/${rin}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            name = data.name;
        } catch (err) {
            setError("Failed to fetch profile");
            console.error(err);
        }
    };

    getName();

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }

        const uid = getCookie('uid');
        const groupid = getCookie('groupid');
        const rin = await getRin();

        await window.addDoc(window.collection(window.doc(window.db, "groups", groupid), "messages"), {
          text: message,
          name: name,
          avatar: "../userProfile.jpeg",
          createdAt: window.serverTimestamp(),
          rin: rin,
          uid,
        });
        setMessage("");
    };
    
    return (
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
          <label htmlFor="messageInput" hidden>
            Enter Message
          </label>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
    );

};