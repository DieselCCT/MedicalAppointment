const dialog = remote.dialog;
const fs = require('fs');
let photoData;
let video;

function savePhoto(filePath) {
  if (filePath) {
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) {
        alert(`There was a problem saving the photo: ${err.message}`);
      }
      photoData = null;
    });
  }
}

function initialize() {
  let errorCallback = (error) => {
    console.log(`There was an error connecting to the video stream:
    ${error.message}`);
  };
  /*window.navigator.webkitGetUserMedia({video: true}, (localMediaStream) => {
    video.src = mediaStream;
  }, errorCallback);
  console.log(errorCallback)*/
  navigator.webkitGetUserMedia({ audio: true, video: { width: 1280, height: 720 } },
    function (stream) {
      var video = window.document.getElementById("video");
      console.log(video)
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    },
    function (err) {
      console.log("The following error occurred: " + err.name);
    });
}

function takePhoto() {
  let canvas = window.document.querySelector('canvas');
  canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
  photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  dialog.showSaveDialog({
    title: "Save the photo",
    defaultPath: 'myfacebomb.png',
    buttonLabel: 'Save photo'
  }, savePhoto);
}
console.log("starting")
window.onload = initialize;
console.log("done")