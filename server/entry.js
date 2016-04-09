// import ss       from 'socket.io-stream';
import socketStream from './streams/socket';
import server       from './server';

const config = {
  commands : [
    {
      name    : 'Start counter',
      command : './counter.sh',
      onEnd   : 'notify'
      //onRegex : [
        //{
          //exp     : /launch/,
          //command : './peace.sh',
          //onEnd   : 'notify'
        //}
      //]
    }
  ]
};

// When a connection is made, a socket will become available.
socketStream.onValue(socket => {

  console.log('connected');

  socket.emit('config', config);

  //const spawn   = require('child_process').spawn;
  //const counter = spawn('./counter.sh'); // so redundant wat

  //const stream  = ss.createStream();
  //ss(socket).emit('p', stream);

  //counter.stdout.pipe(stream);

});

server.listen(3000);

console.info('Truck server running on 3000');
