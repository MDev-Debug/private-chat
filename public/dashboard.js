const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");

socket.emit("user-connected", { username });

socket.on("users-online", (users) => {
  const currentUser = users.find(u => u.username == username)
  users.filter((u) => u.username !== username).forEach((u) => showUser(u, currentUser));
});

function showUser(user, currentUser) {
  const usersOnlineDiv = document.getElementById("users-online");
  
  usersOnlineDiv.innerHTML += `
    <form action="chat.html">
        <div id="send_message">
        <button type="submit" class="btn btn-dark" name="send_user" value="${user.socket_id}">${user.username}</button>
        </div>
        <input type="hidden" name="from_user" value=${currentUser.socket_id}>
    </form>
        `;
}
