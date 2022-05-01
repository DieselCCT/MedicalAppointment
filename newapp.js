const electron = require("electron");
const { ipcRenderer } = electron;
const form = document.getElementById("form");
const btntake = document.getElementById("takepic");
const btnselect = document.getElementById("selectpic");
const elements = {};

form.addEventListener("submit", event => {
	event.preventDefault();
	for (let i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type !== "submit")
		elements[form.elements[i].name] = form.elements[i].value;
	}
	ipcRenderer.send("appointment:create", elements);
});

btntake.addEventListener("click", function() {
	alert("hello");
	webCam = new BrowserWindow({
		webPreferences: {enableRemoteModule:true, nodeIntegration: true, contextIsolation: false},
		useContentSize: true,
		width: 800,
		height: 600,
		resizable: false,
		fullscreen: false,
		title: "Take a Picture"
	});
	require("@electron/remote/main").initialize();
	require("@electron/remote/main").enable(webCam.webContents);
	webCam.setMenu(null);
	webCam.loadURL(`file://${__dirname}/index.html`);
	webCam.on("closed", () => (webCam = null));
});