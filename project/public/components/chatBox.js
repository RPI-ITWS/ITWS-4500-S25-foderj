const ChatBox = () => {
    const [messages, setMessages] = React.useState([]);
    const scroll = React.useRef();

    React.useEffect(() => {
        const groupid = getCookie('groupid');

        const q = window.query(
          window.collection(window.doc(window.db, "groups", groupid), "messages"),
          window.orderBy("createdAt", "desc")
        );

        const unsubscribe = window.onSnapshot(q, (QuerySnapshot) => {
          const fetchedMessages = [];
          QuerySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });
          const sortedMessages = fetchedMessages.sort(
            (a, b) => a.createdAt - b.createdAt
          );

          setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
            {messages.length === 0 ? (
                <p>No messages yet</p>
            ) :
                (messages.map((message) => (
                <Message key={message.id} message={message} />
                )))}
            </div>

            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
        </main>
    );
};


// https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/
// https://www.w3schools.com/js/js_cookies.asp
