import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NAME_SELECT_EVENT = "nameSelected";
const SERVER_URL = "http://localhost:4000";

const useSet= () => {
    const [username, setUsername] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SERVER_URL);

        socketRef.current.on(NAME_SELECT_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setUsername((messages) => [...messages, incomingMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const selectName = (name) => {
        socketRef.current.emit(NAME_SELECT_EVENT, {
            username: name,
            senderId: socketRef.current.id,
        });
    };

    return { username, selectName };

};

export default useSet;