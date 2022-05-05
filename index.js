'use strict';

const electron = require("electron");
const fs = require("fs");
const uuid = require("uuid");
const remote = require('@electron/remote/main')
const { app, BrowserWindow, Menu, ipcMain } = electron;
let loginWindow, listApp, fileExplorer, appointment;
let allAppointments = [];

console.log(app);

fs.readFile("appointments.json", (err, jsonAppointments) => {
	if (!err) {
		const oldAppointments = JSON.parse(jsonAppointments);
		allAppointments = oldAppointments;
		console.log(allAppointments)
	}
});

app.on("ready", () => {

	loginWindow = new BrowserWindow({
		webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false },
		title: "login"
	});
	//remote.enable(loginWindow.webContents);
	loginWindow.loadURL(`file://${__dirname}/login.html`);
	loginWindow.on("closed", () => {
		const jsonAppointments = JSON.stringify(allAppointments);
		fs.writeFileSync("db.json", jsonAppointments);
		app.quit();
		loginWindow = null;
	});
	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
	//loginWindow.setMenu(null)
	loginWindow.on("closed", () => {
		app.quit();
		loginWindow = null;});

});

const newAppointmentCreator = () => {
	appointment = new BrowserWindow({
		webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false },
		width: 600,
		height: 400,
		title: "Create New User"
	});
	remote.initialize();
	remote.enable(appointment.webContents);
	appointment.loadURL(`file://${__dirname}/appointments.html`);
	appointment.on("closed", () => (appointment = null));
};

const fileExplorerCreator = () => {
	fileExplorer = new BrowserWindow({
		webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false },
		width: 600,
		height: 400,
		title: "File Explorer"
	});
	remote.enable(fileExplorer.webContents);
	fileExplorer.loadURL(`file://${__dirname}/fileExplorer/index.html`);
	fileExplorer.on("closed", () => (fileExplorer = null));
};

const listAppCreator = () => {
	listApp = new BrowserWindow({
		webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false },
		width: 600,
		height: 400,
		title: "See All Users"
	});
	listApp.setMenu(null);
	listApp.loadURL(`file://${__dirname}/list.html`);
	listApp.on("closed", () => (listApp = null));
};

// //this shouldn't be here
// const webCamCreator = () => {
// 	webCam = new BrowserWindow({
// 		webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false },
// 		useContentSize: true,
// 		resizable: false,
// 		fullscreen: false,
// 		title: "Take a Picture"
// 	});
// 	remote.enable(webCam.webContents);
// 	//webCam.setMenu(null);
// 	webCam.loadURL(`file://${__dirname}/webcam.html`);
// 	webCam.on("closed", () => (webCam = null));
// };

// const sendTodayAppointments = () => {
// 	const today = new Date().toISOString().slice(0, 10);
// 	const filtered = allAppointments.filter(appointment => appointment.date == today);
// 	mainWindow.webContents.send("appointment:response:today", filtered);
// };

ipcMain.on("appointment:request:list", event => {
	listApp.webContents.send("appointment:response:list",
		allAppointments);
});

// ipcMain.on("appointment:request:today", event => {
// 	sendTodayAppointments();
// });

// ipcMain.on("appointment:create", (event, appointment) => {
// 	appointment["id"] = uuid();
// 	appointment["done"] = 0;
// 	allAppointments.push(appointment);
// 	sendTodayAppointments();
// 	newApp.close();
// });

// ipcMain.on("appointment:done", (event, id) => {
// 	allAppointments.forEach(appointment => {
// 		if (appointment.id === id) appointment.done = 1;
// 	});
// 	sendTodayAppointments();
// });

const menuTemplate = [
{
		label: "File",
		submenu: [
			{
				label: "Create New User",
				click() {
					newAppointmentCreator();
				}
			},
			{
				label: "See All Users",
				click() {
					listAppCreator();
				}
			},
			{
				label: "File Explorer",
				click() {
					fileExplorerCreator();
				}
			},
			{
				label: "Quit",
				accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: "View",
		submenu: [{ role: "reload" }, { role: "toggledevtools" }]
	}
];
