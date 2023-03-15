const socket = io('http://localhost:80', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('form');
const input = document.getElementById('input')
const container = document.querySelector('.container');

const append = (message, position) => {
    const newmessage = document.createElement('div');
    newmessage.innerText = message;
    newmessage.classList.add('message');
    newmessage.classList.add(position);
    container.append(newmessage);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    input.value = '';
})

const username = prompt("Enter Your Name");
// const username = "KArtik";
socket.emit('new-user-join', username);

socket.on('user-joined', username => {
    append(`${username} joined the chat`, 'middle');
})

socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
})

socket.on('left', username => {
    append(`${username} left the chat`, 'middle');
})