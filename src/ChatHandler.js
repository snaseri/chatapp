import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const USER_JOIN_EVENT = "userJoined"
const NAME_SELECT_EVENT = "nameSelected";
const NEW_MESSAGE_EVENT = "newMessage";
const NEW_CONSOLE_MESSAGE_EVENT = "newConsoleMessage";
const USER_INFO = "userInfo"
const SERVER_URL = "http://localhost:4000";



const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [userList, setUserList] = useState([]);
  //  const [] = useState("");
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomId },
        });

        // NEW MESSAGE EVENT
        socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
            let messageOwner = "receiver";
            if (message.senderId === socketRef.current.id) {
                messageOwner = "sender"
            }
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
                messageOwner
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        //CONSOLE LOG
        socketRef.current.on(NEW_CONSOLE_MESSAGE_EVENT, (data) => {
                const incomingConsoleMessage = {
                    body: data,
                    senderId: "CONSOLE",
                    username: "CONSOLE",
                    roomId: roomId,
                    avatar: "https://p.kindpng.com/picc/s/146-1466923_console-icon-free-download-console-application-icon-hd.png",
                    ownedByCurrentUser: 1 === 2,
                    messageOwner: "CONSOLE"
                };
                setMessages((messages) => [...messages, incomingConsoleMessage]);
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

        //USER INFO
        socketRef.current.on(USER_INFO, (data) => {
            console.log("USER INFO " + data.toString());
            console.log("USER INFO " + data.username);
            setCurrentUser(data);
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
            roomId: roomId,
        });
    };


    //USER
    const selectName = (name) => {
        socketRef.current.emit(NAME_SELECT_EVENT, {
            username: name,
            senderId: socketRef.current.id,
            roomId: roomId,
            avatar: "https://icon-library.com/images/funny-icon/funny-icon-16.jpg"
        });
    };

    const userJoin = (name) => {
        socketRef.current.emit(USER_JOIN_EVENT, {
            username: name,
            senderId: socketRef.current.id,
            roomId: roomId
        });
    };

    return { messages, sendMessage, username, selectName, userList, currentUser };
};

export default useChat;