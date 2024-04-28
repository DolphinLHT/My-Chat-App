const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");
var audio = new Audio("images/Message-Sound.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position === "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  append(`You: ${message}`, "right");
  messageInput.value = "";
});

const name = prompt("What is your name?");

socket.emit("new-user", name);

socket.on("user-connected", (name) => {
  append(`${name} has connected`, "right");
});

socket.on("chat-message", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("user-disconnected", (name) => {
  append(`${name} has disconnected`, "right");
});
