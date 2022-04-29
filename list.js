'use strict';

const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.send("appointment:request:list", event);
 
ipcRenderer.on("appointment:response:list", (event, appointments) => {
	const listDiv = document.getElementById("list");
	listDiv.innerHTML = "";
	appointments.forEach(appointment => {
		const appointmentDiv = document.createElement("div");

		const firstNameParagraph = document.createElement("p");
		firstNameParagraph.innerHTML = `First Name: ${appointment.firstName}`;

		const lastNameParagraph = document.createElement("p");
		lastNameParagraph.innerHTML = `Last Name: ${appointment.lastName}`;

		const dateParagraph = document.createElement("p");
		dateParagraph.innerHTML = `Date of Birth: ${appointment.date}`;

		// const genderParagraph = document.createElement("p");
		// genderParagraph.innerHTML = `Gender: ${appointment.gender}`;
		
		const emailParagraph = document.createElement("p");
		emailParagraph.innerHTML = `Email: ${appointment.email}`;

		const numberParagraph = document.createElement("p");
		numberParagraph.innerHTML = `Phone Number: ${appointment.number}`;

		const address1Paragraph = document.createElement("p");
		address1Paragraph.innerHTML = `Address 1: ${appointment.address1}`;

		const address2Paragraph = document.createElement("p");
		address2Paragraph.innerHTML = `Address 2: ${appointment.address2}`;

		const eircodeParagraph = document.createElement("p");
		eircodeParagraph.innerHTML = `Eircode: ${appointment.eircode}`;

		const cityParagraph = document.createElement("p");
		cityParagraph.innerHTML = `City: ${appointment.city}`;

		const countryParagraph = document.createElement("p");
		countryParagraph.innerHTML = `Country: ${appointment.country}`;

		const doneParagraph = document.createElement("p");
		doneParagraph.innerHTML = `Done: ${appointment.done ? "Yes" : "No"}`;

		const doneButton = document.createElement("button");
		doneButton.innerHTML = "Done";
		doneButton.disabled = appointment.done ? true : false;
		doneButton.onclick = () => done(appointment.id);

		appointmentDiv.appendChild(firstNameParagraph);
		appointmentDiv.appendChild(lastNameParagraph);
		appointmentDiv.appendChild(dateParagraph);
		//appointmentDiv.appendChild(genderParagraph);
		appointmentDiv.appendChild(emailParagraph);
		appointmentDiv.appendChild(numberParagraph);
		appointmentDiv.appendChild(address1Paragraph);
		appointmentDiv.appendChild(address2Paragraph);
		appointmentDiv.appendChild(eircodeParagraph);
		appointmentDiv.appendChild(cityParagraph);
		appointmentDiv.appendChild(countryParagraph);
		appointmentDiv.appendChild(doneParagraph);
		appointmentDiv.appendChild(doneButton);
		listDiv.append(appointmentDiv);
	});
});
 
const done = id => {
	ipcRenderer.send("appointment:done", id);
};