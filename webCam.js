const { ipcRenderer } = require("electron");
const fs = require('fs');
let photoData;
let video;
const takePicture = document.getElementById("takePhoto");

function savePhoto (filePath) {
  console.log(filePath)
  if (filePath) {
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      console.log(filePath)
      if (err) {
        console.log(`There was a problem saving the photo: ${err.message}`);
      }
      photoData = null;
    });
  }
}

function initialize () {
  let errorCallback = (error) => {
    console.log(`There was an error connecting to the video stream:
    ${error.message}`);
  };
  video = window.document.getElementById("video");
  navigator.webkitGetUserMedia({ audio: false, video: true },
  (stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
 },
 function(err) {
    console.log("The following error occurred: " + err.name);
 });
}

function takePhoto () {
  let canvas = window.document.querySelector('canvas');
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  canvas.getContext('2d').drawImage(video, 0, 0);
  console.log(canvas)
  photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  console.log(photoData)
  let path;
  //requesting dialog from appointment.js
  ipcRenderer.send("dialog-request", path);
  //receiving dialog from appointmen.js
  ipcRenderer.on("dialog-response", (event, path) => {
    savePhoto(path);
  });
}

window.onload = initialize;

takePicture.addEventListener('click', () => {
	takePhoto();
});