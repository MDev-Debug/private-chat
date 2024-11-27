import express from 'express';
import http from 'http'
import path from 'path';
import { Server } from 'socket.io';

const app = express();
app.use(express.static(path.join(__dirname, '../', 'public')))

app.get('/healthz', (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: new Date(),
    };

    try {
        res.status(200).json(healthCheck);
    } catch (error) {
        res.status(503).json({ message: 'Service Unavailable' }); 
    }
});

const server = http.createServer(app)
const io = new Server(server)

export { server, io }
