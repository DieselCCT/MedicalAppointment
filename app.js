const dialog = require('@electron/remote');
const fs = require('fs');
let photoData;
let video;
const takePic = document.getElementById("takePhoto");

function savePhoto (filePath) {
  if (filePath) {
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) {
        alert(`There was a problem saving the photo: ${err.message}`);
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
  /*window.navigator.webkitGetUserMedia({video: true}, (localMediaStream) => {
    video.src = mediaStream;
  }, errorCallback);
  console.log(errorCallback)*/
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
  canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
  console.log(canvas)
  photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  console.log(photoData)
  dialog.showSaveDialog({
    title: "Save the photo",
    defaultPath: 'myfacebomb.png',
    buttonLabel: 'Save photo'
  }, savePhoto);
}

window.onload = initialize;

takePic.addEventListener('click', () => {
	takePhoto();
});