import React from "react";

import "./Room.css";
import useChat from "../ChatHandler";


const ChatRoom = (props) => {
    const { roomId } = props.match.params;
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

    function getMessageOwner(messageOwner) {
        if (messageOwner === "sender" ) {
            return "my-message";
        }
        if (messageOwner === "receiver" ) {
            return "received-message";
        }
        if (messageOwner === "CONSOLE" ) {
            return "console-message";
        }
    }

    return (
        <div>
            <div className="active-users">
                <h2>Active Users: ({userList.length}) </h2>
                <ul>
                    {userList.map(function(item) {
                        return <li key={item}>{item.username}</li>;
                    })}
                </ul>
            </div>
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
                {/*<form method="post" enctype="multipart/form-data" action="/upload">*/}
                {/* <input  className="file-input" type="file" name="file"/>*/}
                {/* <input type="submit" value="Submit"/>*/}
                {/*</form>*/}

                <div className="chat-room-metric">
                <b><p>You're in Room: {roomId}</p></b>
                <p>Messages sent in this room: {messages.length}</p>
                </div>
                <div className="chat-room-container">
                    <div className="messages-container">
                        <ol className="messages-list">
                            {messages.map((message, i) => (
                                <li
                                    key={i}
                                    className={`message-item ${ 
                                        getMessageOwner(message.messageOwner)
                                        // message.ownedByCurrentUser ? "my-message" : "received-message"
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