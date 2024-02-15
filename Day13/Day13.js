const express = require(`express`);
const http = require(`http`);
const WebSocket = require(`ws`);
function setupWebSocket(server){
    const wss=new WebSocket.Server({server});
    wss.on(`connection`,(ws) => {
        console.log(`Client Connected to WebSocket`);
    ws.on(`message`,(message) => {
        console.log(`Received Message: ${message}`);
        ws.send(`Server Echo: ${message}`);
    });
    ws.on('close',() => {
        console.log(`Client Disconnected from WebSocket.`);
    });
    });
}
const app=express();
const server=http.createServer(app);
setupWebSocket(server);
app.get('/websocket', (req, res) =>{
    res.sendFile(__dirname+ '/websocket.html');
});
server.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`);
});