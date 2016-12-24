var express = require("express"),
  app = express(),
  server = require("http").createServer(app);

var io = require("socket.io").listen(server);


var port = process.env.PORT || 9999;

app.use("/clientapp", express.static(__dirname + '/clientapp'));


io.on("connection", function (socket) {
  console.log("We have a connection...");
  socket.on("new-message", function (msg) {
    console.log(msg);
    io.emit("receive-message", msg);
  });

  socket.on("test", function () {
    console.log("mounted...");
  })
});

server.listen(port, function () {
  console.log("Connected on port ", port);

});


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});