import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const USER_JOIN_EVENT = "userJoined"
const NAME_SELECT_EVENT = "nameSelected";
const NEW_MESSAGE_EVENT = "newMessage";
const NEW_CONSOLE_MESSAGE_EVENT = "newConsoleMessage";
const AVATAR_SELECT_EVENT = "avatarSelected";
const SERVER_URL = "http://localhost:4000";

const DEFAULT_AVATAR = "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"


const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
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
                    avatar: "https://www.clipartmax.com/png/middle/264-2647820_radio-broadcast-comments-broadcast-icon-png.png",
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

        //USER AVATAR EVENT
        socketRef.current.on(AVATAR_SELECT_EVENT, (data) => {
            setUserAvatar(data);
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
            avatar: DEFAULT_AVATAR,
            roomId: roomId,
        });
    };


    //USER
    const selectName = (name) => {
        socketRef.current.emit(NAME_SELECT_EVENT, {
            username: name,
            senderId: socketRef.current.id,
            roomId: roomId,
            avatar: DEFAULT_AVATAR
        });
    };

    const selectAvatar = (avatar) => {
        socketRef.current.emit(AVATAR_SELECT_EVENT, {
            senderId: socketRef.current.id,
            roomId: roomId,
            avatar: avatar
        });
    };

    const userJoin = (name) => {
        socketRef.current.emit(USER_JOIN_EVENT, {
            username: name,
            senderId: socketRef.current.id,
            roomId: roomId
        });
    };

    return { messages, sendMessage, username, selectName, userList, selectAvatar };
};

export default useChat;