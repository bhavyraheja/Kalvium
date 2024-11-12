// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let currentPage = 1; // Keeps track of the current PDF page

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current page to new users
  socket.emit('pageChange', currentPage);

  // Handle admin page changes
  socket.on('adminChangePage', (newPage) => {
    currentPage = newPage;
    io.emit('pageChange', currentPage); // Notify all clients of the page change
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

