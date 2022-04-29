/*'use strict';

const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.send("appointment:request:today", event);
 
ipcRenderer.on("appointment:response:today", (event, appointments) => {
	const listDiv = document.getElementById("list");
	listDiv.innerHTML = "";
	appointments.forEach(appointment => {
		const appointmentDiv = document.createElement("div");
		const nameParagraph = document.createElement("p");
		nameParagraph.innerHTML = `Name: ${appointment.name}`;
		const numberParagraph = document.createElement("p");
		numberParagraph.innerHTML = `Phone Number: ${appointment.number}`;
		const dateParagraph = document.createElement("p");
		dateParagraph.innerHTML = `Date: ${appointment.date}`;
		const doneParagraph = document.createElement("p");
		doneParagraph.innerHTML = `Done: ${appointment.done ? "Yes" : "No"}`;
		const doneButton = document.createElement("button");
		doneButton.innerHTML = "Done";
		doneButton.disabled = appointment.done ? true : false;
		doneButton.onclick = () => done(appointment.id);
		appointmentDiv.appendChild(nameParagraph);
		appointmentDiv.appendChild(numberParagraph);
		appointmentDiv.appendChild(dateParagraph);
		appointmentDiv.appendChild(doneParagraph);
		appointmentDiv.appendChild(doneButton);
		listDiv.append(appointmentDiv);
	});
});
 
const done = id => {
	ipcRenderer.send("appointment:done", id);
};*/