import React from "react";

import "./Room.css";
import useChat from "../ChatHandler";
// import useList from "../UserHandler";


const ChatRoom = (props) => {
    const { roomId } = props.match.params;
    // const {userList} = useList(roomId);
    const { messages, sendMessage, username, selectName, userList} = useChat(roomId);


    const [newMessage, setNewMessage] = React.useState("");
    const [userName, setUsername] = React.useState();


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);

    };

    const handleSetUsername = () => {
        selectName(userName);
    };

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };

    console.log(userList);
    console.log(messages);

    return (
        <div>
            <div className="active-users">
                <p>{userList.length}</p>
            </div>
            <h1 className="chat-room-name">You're in Room: {roomId}</h1>
            <div className="chat-room-header">
                <input
                    className="name-input-field"
                    type="text"
                    placeholder="Please Enter Your Name"
                    value={userName}
                    onChange={handleUsernameChange}
                />
                <button to={`/RoomSelector`} onClick={handleSetUsername} className="select-name-button">
                    Set
                </button>
                <form method="post" enctype="multipart/form-data" action="/upload">
                 <input  className="file-input" type="file" name="file"/>
                 <input type="submit" value="Submit"/>
                </form>

                <div className="chat-room-container">
                    <div className="messages-container">
                        <ol className="messages-list">
                            {messages.map((message, i) => (
                                <li
                                    key={i}
                                    className={`message-item ${
                                        message.ownedByCurrentUser ? "my-message" : "received-message"
                                    }`}
                                >
                                    {message.username + ": " + message.body}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <textarea
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        placeholder="Send a message..."
                        className="new-message-input-field"
                    />
                    <button onClick={handleSendMessage} className="send-message-button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;