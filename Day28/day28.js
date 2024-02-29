const WebSocket = require('ws');
const path = require("path");
const express = require("express");
const http = require("http");

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws) {
        console.log('New WebSocket connection');

        ws.on('message', function incoming(message) {
            const receivedMessage = message.toString("utf8");
            console.log('Received message:', receivedMessage);
            
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(receivedMessage);
                }
            });
        });

        ws.on('close', function close() {
            console.log('WebSocket connection closed');
        });
    });
}

const app = express();
const server = http.createServer(app);
setupWebSocketServer(server);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(3000, function() {
    console.log("Server started on port 3000");
});