const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 4000;
const NEW_MESSAGE_EVENT = "newMessage";
const NAME_SELECT_EVENT = "nameSelected";
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
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    const defaultUser = {
        username: "Unknown",
        senderId: socket.id,
        roomId: roomId
    }

    currUsers.push(defaultUser);

    // Listen for new messages
    socket.on(NEW_MESSAGE_EVENT, (data) => {
        console.log("Current array: ");
        console.log(currUsers);
        //Binding sender username to the message
        for (var i=0, len=currUsers.length; i<len; ++i ){
            if (currUsers[i].senderId == data.senderId) {
                data.username = currUsers[i].username;
            }
        }
        io.in(roomId).emit(NEW_MESSAGE_EVENT, data);
        savedMessages.push(data);
        //logging messages into a json file
        fs.writeFileSync("messagelog.json", JSON.stringify(savedMessages));
    });

    //Tracking User Info
    socket.on(NAME_SELECT_EVENT, (data) => {
        console.log("User selected name: ");
        removeUserBySocketId(currUsers, data.senderId);
        currUsers.push(data);
        io.in(roomId).emit(USER_JOIN_EVENT, data);
    });

    // Remove user from the array of current users when a user leaves
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        console.log("=-=-=-=-=-=-=-=-=-=-=");

        //Removing users from currUsers variable on disconnect
        removeUserBySocketId(currUsers, socket.id)
        console.log("=-=-=-=-=-=-=-=-=-=-=");
        socket.leave(roomId);
    });
});

//Moving the remove user code into a function since its been used more than once.
function removeUserBySocketId(currentUsersArray, socketIdToDeleteUser) {
    for (var i=currentUsersArray.length -1, len=currentUsersArray.length; i>=0; i-- ){
        var currentId = currentUsersArray[i].senderId;
        if (currentId == socketIdToDeleteUser) {
            console.log(currentUsersArray[i].username + " Deleted");
            currUsers.splice(i,1);
            console.log(currentUsersArray);
        }
    }
}

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});