'use strict';

const electron = require("electron");
const fs = require("fs");
const uuid = require("uuid");
const { app, BrowserWindow, Menu, ipcMain } = electron;
let mainWindow;
let newApp;
let listApp;
let webCam = null;
let allAppointments = [];

fs.readFile("appointments.json", (err, jsonAppointments) => {
	if (!err) {
		const oldAppointments = JSON.parse(jsonAppointments);
		allAppointments = oldAppointments;
		console.log(allAppointments)
	}
});

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		webPreferences: {enableRemoteModule:true, nodeIntegration: true, contextIsolation: false},
		title: "Gym Registration App"
	});
	mainWindow.loadURL(`file://${__dirname}/appointments.html`);
	// mainWindow.on("closed", () => {
	// 	const jsonAppointments = JSON.stringify(allAppointments);
	// 	fs.writeFileSync("appointments.json", jsonAppointments);
	// 	app.quit();
	// 	mainWindow = null;
	// });
	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

const newAppCreator = () => {
	newApp = new BrowserWindow({
		webPreferences: {enableRemoteModule:true, nodeIntegration: true, contextIsolation: false},
		width: 600,
		height: 400,
		title: "Create New User"
	});
	newApp.setMenu(null);
	newApp.loadURL(`file://${__dirname}/newApp.html`);
	newApp.on("closed", () => (newApp = null));
};

const listAppCreator = () => {
	listApp = new BrowserWindow({
		webPreferences: {enableRemoteModule:true, nodeIntegration: true, contextIsolation: false},
		width: 600,
		height: 400,
		title: "See All Users"
	});
	listApp.setMenu(null);
	listApp.loadURL(`file://${__dirname}/list.html`);
	listApp.on("closed", () => (listApp = null));
};

//this shouldn't be here
const webCamCreator = () => {
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
	webCam.loadURL(`file://${__dirname}/newApp.html`);
	webCam.on("closed", () => (webCam = null));
};

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
		 newAppCreator();
	 }
 },
 {
	 label: "See All Users",
	 click() {
		 listAppCreator();
	 }
 },
//  {
// 	 label: "Take a Picture",
// 	 click() {
// 		 webCamCreator();
// 	 }
//  },
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