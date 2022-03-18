// include express server
const express = require("express"),
  //include socket
  socketio = require("socket.io"),
  //include http to create server connect to socket.io
  http = require("http");
const { addListener } = require("process");
const { options } = require("request");
//include path to working with file and directory paths
(path = require("path")),
  //use express
  (app = express()),
  //define PORT
  (port = process.env.PORT || 3000),
  //include bad-words
  (Filter = require("bad-words"));
// Generate Message
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
// Create Server
const server = http.createServer(app);

//create server with socket
const io = socketio(server);

//include users.js
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");
//Usage filter
const filter = new Filter();
//Use env
require("dotenv").config();

//read file directory
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

//Connect to socket
io.on("connection", (socket) => {
  console.log("New socket connected");

  // Send a welcome message to new users
  // let message = "Welcome!";
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({id: socket.id, username, room});
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit("mess", generateMessage("Admin","Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("mess", generateMessage("Admin",` ${user.username} has joined`));
      io.to(user.room).emit('roomData', {
      room:user.room,
      users: getUsersInRoom(user.room)
    })
    callback()
  }),

  socket.on("sendMessage", ({ username, room }, datafromUser, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(datafromUser)) {
      return callback(generateMessage("Admin","Not acceptable your message"));
    }
    io.to(user.room).emit("mess", generateMessage(user.username,datafromUser));
    callback();
  }),
  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);
    // console.log(socket.id);
    io.to(user.room).emit("locationMessage",generateLocationMessage(user.username,`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`));
    callback();
  }),
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    // console.log(user);
    if(user) {
      io.to(user.room).emit("mess",generateMessage("Admin",`${user.username} has left!`));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
  });
});

// run on Port 3000
server.listen(port, () => {
  console.log("Hello World");
});
