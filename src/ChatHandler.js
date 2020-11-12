import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const USER_JOIN_EVENT = "userJoined"
const NAME_SELECT_EVENT = "nameSelected";
const NEW_MESSAGE_EVENT = "newMessage";
const SERVER_URL = "http://localhost:4000";



const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [userList, setUserList] = useState([]);
  //  const [] = useState("");
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomId },
        });

        // NEW MESSAGE EVENT
        socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        //USER JOIN
        socketRef.current.on(USER_JOIN_EVENT, (data) => {
            setUserList(data);
        });

        //USER NAME EVENT
        socketRef.current.on(NAME_SELECT_EVENT, (data) => {
            console.log("current name " + data.toString());
            //setUsername((userName) => [...userName, data]);
            setUsername(data);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            username: "Unknown",
            roomId: roomId
        });
    };


    //USER
    const selectName = (name) => {
        socketRef.current.emit(NAME_SELECT_EVENT, {
            username: name,
            senderId: socketRef.current.id,
            roomId: roomId
        });
    };

    const userJoin = (name) => {
        socketRef.current.emit(USER_JOIN_EVENT, {
            username: name,
            senderId: socketRef.current.id,
            roomId: roomId
        });
    };

    return { messages, sendMessage, username, selectName, userList };
};

export default useChat;