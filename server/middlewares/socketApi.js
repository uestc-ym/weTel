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

  socket.on('sendMsg', async (msg) => {
    const res = await Message.saveMsg(msg);

    // 指定socketId发送消息
    /*chat.sockets[socketId].emit('getMsg', {
      code: res.code,
      msg
    });*/

    // 给当前的socket发送信息
    socket.emit('getMsg', {
      code: res.code,
      msg
    });

    if (res.code === 200) {
      // 给除了自己的其他人发送信息
      socket.broadcast.emit('getMsg', {
        code: 200,
        msg
      });
    }
  })

  // disconnect usercount
  socket.on('disconnect', () => {
    console.log('chat disconnect!!!')
  })
})

module.exports = io;