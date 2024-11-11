import { Socket } from 'socket.io';
import { io } from './http'
import { User } from './interfaces/user';
import { Message } from './interfaces/message';

const users: User[] = [];
const messages_sended: Message[] = [];
const messages_received: Message[] = [];

io.on('connection', (socket: Socket) => {

    socket.on('user-connected', (data) => handleUserConnected(socket, data));
    socket.on('send_message', (data) => handleSendMessage(data));

    socket.on('join_room', (data) => {
        const privateRoom = generateRoomId(data.payload.fromUserSocketID, data.payload.sendUserSocketID)
        socket.join(privateRoom);
    });
})


function handleUserConnected(socket: Socket, data: User) {
    let userFound = users.find(u => u.username == data.username)

    if (userFound) {
        userFound.socket_id = socket.id;
    } else {
        users.push({
            socket_id: socket.id,
            username: data.username,
            mensagensRecebidas: messages_sended.filter(m => m.to_user === socket.id),
            mensagensEnviadas: messages_received.filter(m => m.to_user === socket.id)
        })
    }

    io.emit('users-online', users)
}

function handleSendMessage(data: any) {
    const msg: Message = {
        usernameReceived: users.find(u => u.socket_id === data.to_user)?.username || '',
        usernameSended: users.find(u => u.socket_id === data.from_user)?.username || '',
        to_user: data.to_user,
        from_user: data.from_user,
        text: data.text,
        createdAt: new Date()
    };

    const privateRoom = generateRoomId(data.from_user, data.to_user)

    io.to(privateRoom).emit('receive_message', msg);
}

function generateRoomId(user_1: any, user_2: any) {
    const sortedUsers = [user_1, user_2].sort();
    return `${sortedUsers[0]}_${sortedUsers[1]}`;
}