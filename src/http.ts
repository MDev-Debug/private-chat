import express from 'express';
import http from 'http'
import path from 'path';
import { Server } from 'socket.io';

const app = express();
app.use(express.static(path.join(__dirname, '../', 'public')))

const server = http.createServer(app)
const io = new Server(server)

export { server, io }
