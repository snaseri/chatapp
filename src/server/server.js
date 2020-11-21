const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 4000;
const NEW_MESSAGE_EVENT = "newMessage";
const NEW_CONSOLE_MESSAGE_EVENT = "newConsoleMessage";
const NAME_SELECT_EVENT = "nameSelected";
const AVATAR_SELECT_EVENT = "avatarSelected";
const USER_JOIN_EVENT = "userJoined"

//An Array to keep track of all connected users
const currUsers = [];

//Persisting messages
//reading messages from json
const fs = require('fs');

let savedMessages = [];

//Checking if the file exists
try {
    let rawdata = fs.readFileSync('messagelog.json');
    savedMessages = JSON.parse(rawdata);
} catch (err) {
    console.log("There was an error with loading the messages: " + err);
}


io.on("connection", (socket) => {
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId)

    io.in(roomId).emit(NEW_CONSOLE_MESSAGE_EVENT, "New User Has Joined");
    //Adding the default user
    const defaultUser = {
        username: "Unknown",
        senderId: socket.id,
        roomId: roomId,
        avatar: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
    }
    currUsers.push(defaultUser);


    generateRoomActiveUsers(roomId)


    //Restore messages from the log file back into the chat room:
    for (var i = 0, len=savedMessages.length; i < len; i++) {
        if (savedMessages[i].roomId == roomId) {
            io.in(roomId).emit(NEW_MESSAGE_EVENT, savedMessages[i]);
        }
    }

    // Listen for new messages
    socket.on(NEW_MESSAGE_EVENT, (data) => {
        //Binding sender username to the message
        for (var i=0, len=currUsers.length; i<len; ++i ){
            if (currUsers[i].senderId == data.senderId) {
                data.username = currUsers[i].username;
                data.avatar = currUsers[i].avatar;
            }
        }
        io.in(roomId).emit(NEW_MESSAGE_EVENT, data);
        savedMessages.push(data);
        //logging messages into a json file
        fs.writeFileSync("messagelog.json", JSON.stringify(savedMessages));
    });

    //Tracking User Info
    //CHANGING NAME
    socket.on(NAME_SELECT_EVENT, (data) => {
        //Console logging the event in room
        console.log("User selected name: " + data.username);
        let oldName = getUserBySocketID(socket.id)
        let consoleMsg = oldName.username + " has changed their name to " + data.username;
        io.in(roomId).emit(NEW_CONSOLE_MESSAGE_EVENT, consoleMsg);
        //This for loops makes user keeps their avatar
        for (var i=0, len=currUsers.length; i<len; ++i ){
            if (currUsers[i].senderId == data.senderId) {
                data.avatar = currUsers[i].avatar;
            }
        }
        removeUserBySocketId(currUsers, data.senderId);
        currUsers.push(data);
        generateRoomActiveUsers(roomId);
    });
    //CHANGING AVATAR
    socket.on(AVATAR_SELECT_EVENT, (data) => {
        //updating the avatar
        for (var i=0, len=currUsers.length; i<len; ++i ){
            if (currUsers[i].senderId == data.senderId) {
                currUsers[i].avatar = data.avatar;
                console.log("Avatar updated");
                //Console logging the event in room
                let consoleMsg = currUsers[i].username + " Update their avatar. ";
                io.in(roomId).emit(NEW_CONSOLE_MESSAGE_EVENT, consoleMsg);
            }
        }
    });

    // Remove user from the array of current users when a user leaves
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        let deletedUser = getUserBySocketID(socket.id)
        let delConsoleMsg = deletedUser.username + " Has left. "
        io.in(roomId).emit(NEW_CONSOLE_MESSAGE_EVENT, delConsoleMsg);
        //Removing users from currUsers variable on disconnect
        removeUserBySocketId(currUsers, socket.id)
        generateRoomActiveUsers(roomId)
        socket.leave(roomId);
    });


    console.log("Total users: " + currUsers.length);
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
});



server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

//Moving the remove user code into a function since its been used more than once.
function removeUserBySocketId(currentUsersArray, socketIdToDeleteUser) {
    for (var i=currentUsersArray.length -1, len=currentUsersArray.length; i>=0; i-- ){
        var currentId = currentUsersArray[i].senderId;
        if (currentId == socketIdToDeleteUser) {
            console.log(currentUsersArray[i].username + " Deleted");
            currUsers.splice(i,1);
        }
    }
}

function getUserBySocketID(socketId) {
    for (var i=currUsers.length -1, len=currUsers.length; i>=0; i-- ){
        var currentId = currUsers[i].senderId;
        if (currentId == socketId) {
            return currUsers[i];
        }
    }
}

function generateRoomActiveUsers(roomId) {
    let usersInCurrentRoom = [];
    for (var i = 0, len=currUsers.length; i < len; i++) {
        if (currUsers[i].roomId == roomId) {
            usersInCurrentRoom.push(currUsers[i]);
        }
    }
    console.log("Users in room " + roomId +  ": " + usersInCurrentRoom.toString());
    io.in(roomId).emit(USER_JOIN_EVENT, usersInCurrentRoom);
}
