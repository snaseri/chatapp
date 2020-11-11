const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 4000;
const NEW_MESSAGE_EVENT = "newMessage";
const NAME_SELECT_EVENT = "nameSelected";
const USER_JOIN_EVENT = "userJoined"
//An Array to keep track of all connected users
const currUsers = [];

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_MESSAGE_EVENT, (data) => {
        console.log("Current array: ");
        console.log(currUsers);
        //Binding sender username to the message
        for (var i=0, len=currUsers.length; i<len; ++i ){
            if (currUsers[i].senderId == data.senderId) {
                console.log("called")
                data.username = currUsers[i].username;
            }
        }
        io.in(roomId).emit(NEW_MESSAGE_EVENT, data);
    });

    //Tracking User Info
    socket.on(NAME_SELECT_EVENT, (data) => {
        console.log("User selected name: ");
        currUsers.push(data);
        io.in(roomId).emit(USER_JOIN_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        // console.log("=-=-=-=-=-=-=-=-=-=-=");
        // for (var i=0, len=currUsers.length; i<len; ++i ){
        //     console.log(currUsers[i].senderId);
        //     var currentId = currUsers[i].senderId;
        //     if (currentId = socket.id) {
        //         currUsers.splice(i,1);
        //     }
        // }
        // console.log("=-=-=-=-=-=-=-=-=-=-=");
        // console.log(currUsers);
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});