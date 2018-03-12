const SMTPServer = require('smtp-server').SMTPServer;
const server = new SMTPServer({
  authOptional: true,
  banner: 'Be brief',
  onConnect(session, callback) {
    console.log('new connection');
    callback();
  },
  onRcptTo(mail, session, callback) {
    console.log(mail);
    callback();
  },
  onData(stream, session, callback) {
    stream.pipe(process.stdout); // print message to console
    stream.on('end', callback);
  }
});

server.on('error', err => {
  console.log('Error %s', err.message);
});


server.listen(process.env.PORT || 25, () => console.log('listening'));
