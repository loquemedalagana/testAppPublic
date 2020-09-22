const webSocket = require('ws');

module.exports = (server) => {
    const socket = new webSocket.Server({server});
    socket.on('connection', (ws, req) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('new client is connected', ip);
        ws.on('message', (message) => {
            console.log(message);
        });
        ws.on('error', (error) => {
            console.error(error);
        });
        ws.on('close', () => {
            console.log('a user is gone', ip);
            clearInterval(ws.interval);
        });
        ws.interval = setInterval(() => {
            if(ws.readyState === ws.OPEN) {
                ws.send('서버에서 클라로 메세지 보냅니다.');
            }
        }, 5000); //5초마다
    });
};