'use strict';

const { BrowserWindow, ipcMain, dialog } = require('@electron/remote');
const takePic = document.getElementById("takepic");

const webCamCreator = () => {
	let webCam = new BrowserWindow({
		webPreferences: {enableRemoteModule:true, nodeIntegration: true, contextIsolation: false},
		useContentSize: true,
		resizable: true,
		fullscreen: false,
		title: "Take a Picture"
	});
	webCam.setMenu(null);
	webCam.loadURL(`file://${__dirname}/webcam.html`);
	webCam.on("closed", () => (webCam = null));
};

//creating dialog for saving picture in webcam.js
ipcMain.on("dialog-request", (event, arg) => {
	const path = dialog.showSaveDialogSync({
		title: "Save the photo",
		defaultPath: "test.png",
		buttonLabel: 'Save photo'
	});
	console.log(path)
	//replying dialog
	event.reply("dialog-response", path)
});

takePic.addEventListener('click', () => {
	webCamCreator();
});