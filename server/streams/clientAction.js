import { Bus }    from 'baconjs';
import socketProp from '../properties/socket';

const clientActionStream = new Bus();

socketProp.onValue(socket => {

  socket.on('action', action => {
    clientActionStream.push(action);
  });

});

export default clientActionStream;
