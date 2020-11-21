import React from "react";
import { Link } from "react-router-dom";

import "./RoomSelection.css";

const RoomSelection = () => {
    const [roomName, setRoomName] = React.useState("");
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    return (
        <div>

            <div className="home-title">
                <b>Welcome to <span className="white-text-color">Simple</span> <span className="blue-text-color">Chat     </span></b>
                <img src="https://icon-library.com/images/chat-app-icon/chat-app-icon-24.jpg"  width="128" height="128"/>
            </div>
            <div className="roomsel-container">
                <input
                    type="text"
                    placeholder="Enter the Chat Room You Would Like To Enter"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    className="roomsel-input-field"
                />
                <Link to={`/${roomName}`} className="enter-room-button">
                    Join this chat room
                </Link>
            </div>
        </div>
    );
};

export default RoomSelection;