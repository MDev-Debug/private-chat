const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const fromUserSocketID = urlSearch.get("from_user");
const sendUserSocketID = urlSearch.get("send_user");

const payload = {
    fromUserSocketID,
    sendUserSocketID
}

socket.emit('join_room', { payload });

document.getElementById('btn-enviar').addEventListener("click", (e) => {
    let text_message = document.getElementById("message");

    let message = {
        text: text_message.value,
        to_user: sendUserSocketID,
        from_user: fromUserSocketID,
        createdAt: new Date()
    }

    text_message.value = '';
    socket.emit('send_message', message)
})

socket.on('receive_message', (msg) => {
    console.log(msg);
    let messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `
        <strong>${msg.usernameSended}:</strong> ${msg.text} <br>
    `
});