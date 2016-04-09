import socketIO from 'socket.io';
import { Bus }  from 'baconjs';
import server   from '../server';

const io           = socketIO(server);
const socketStream = new Bus();

io.on('connection', socket => {
  console.log('Connected');
  socketStream.push(socket);
});

export default socketStream;
