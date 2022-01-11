const server = require('./api/server');

const port = 9000;
// START YOUR SERVER HERE
server.listen(port, () => {
    console.log('listening for HTTPS requests from clients on port 9000');
});