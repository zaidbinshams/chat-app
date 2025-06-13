const { send } = require("process");

const socket = io("http://localhost:8000");
const msgField = document.querySelector("#msg-field");
const sendText = document.querySelector("form input#send-text");
const chatWindow = document.querySelector("div.chat-window");

function appendMsg(message) {
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

msgField.addEventListener("submit", (e) => {
    e.preventDefault();
    const yourMsg = sendText.value;
    appendMsg(`You
        ${yourMsg}`);
    socket.emit("send", yourMsg);
    sendText.value = "";
});

const name = prompt("Enter your name: ");
socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    appendJoin(`${name} has joined this room.`);
});

socket.on("receive", data => {
    appendMsg(`${data.name}
        ${data.message}`);
});

socket.on("leave", name => {
    appendJoin(`${name} has left the room.`);
});