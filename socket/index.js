
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => { 
  socket.emit("me",socket.id);
  //when ceonnect
  console.log("a user connected.");

  socket.on('requestDonnation', (donation) => {
    console.log('donation requested:', donation);
    io.emit('donation', donation);
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    console.log('call')
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

  // const notificationChangeStream = Notification.watch();
  // notificationChangeStream.on('change', (change) => {
  //   if (change.operationType === 'insert') {
  //     io.emit('newNotification', change.fullDocument);
  //   }
  // });

  socket.on('newNotification', (notification) => {
    console.log('Nouvelle notification reçue:', notification);
  });


  socket.on("typing", ({ senderId, receiverId }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("isTyping", senderId);
    console.log("typing")
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("notTyping", senderId);
    console.log("stop typing")
  });

  

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users)  ;
  });

  

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });

    const notification = {
      type: 'message',
      senderId,
      message: text,
      createdAt: new Date(),
    };
    io.to(user.socketId).emit("newMsgNotification", notification);
 
    
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});