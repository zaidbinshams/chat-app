const socket = io("http://localhost:8000");
const msgField = document.querySelector("#msg-field");
const sendText = document.querySelector("form input#send-text");
const chatWindow = document.querySelector("div.chat-window");

function append(message) {
    const msg = document.createElement("div");
    msg.classList.add("msg");
    msg.textContent = message;
    chatWindow.append(msg);
}

function appendJoin(joinMessage) {
    const msg = document.createElement("div");
    msg.classList.add("join-msg");
    msg.textContent = joinMessage;
    chatWindow.append(msg);
}

const name = prompt("Enter your name: ");
socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    appendJoin(`${name} has joined this room.`);
});
