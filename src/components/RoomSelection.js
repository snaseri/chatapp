import React from "react";
import { Link } from "react-router-dom";

import "./RoomSelection.css";

const RoomSelection = () => {
    const [roomName, setRoomName] = React.useState("");
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    return (
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
    );
};

export default RoomSelection;