//const { ipcRenderer } = require('@electron/remote');
const listDiv = document.getElementById("list");
listDiv.innerHTML = "";

function log() {
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    location.href = "appointments.html";
}