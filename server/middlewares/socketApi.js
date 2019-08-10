/***************************** socketio -- port: 3031 */ 
const Message = require('../../server/service/message.js');

const server = require('http').createServer();
const io = require('socket.io')(server, {origins: '*:*'});
// broadcast
io.on('connection', socket => {
  console.log('client socketio connect!');
  socket.broadcast.emit('user connected!');

  socket.on('message', data => {
    console.log('messagedata--', data);
  })

  socket.on('disconnect', () => { 
    console.log('client socketio disconnect!')
  });
});
server.listen(3031);

// chat channel
let chat = io.of('/chat');

chat.on('connection', (socket) => {
  let socketId = socket.id;
console.log(socketId);
  socket.on('sendMsg', async (msg) => {
    const res = await Message.saveMsg(msg);
    console.log(res);

    chat.sockets[socketId].emit('getMsg', {
      code: res.code,
      msg
    });
  })

  // disconnect usercount
  socket.on('disconnect', () => {
    console.log('chat disconnect!!!')
  })
})

module.exports = io;