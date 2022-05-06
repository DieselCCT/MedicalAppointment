'use strict'

var async = require('async');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');

const { shell } = require('electron');

function getUsersHomeFolder() {
	return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
	fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
  let result = { file: path.basename(filePath), path: filePath, type: '' };
    fs.stat(filePath, (err, stat) => {
      if (err) {
        cb(err);
      }       else {
        if (stat.isFile()) {
          result.type = 'file';
        }
        if (stat.isDirectory()) {
          result.type = 'directory';
        }
        cb(err, result);
      }
    });
  }

  function inspectAndDescribeFiles(folderPath, files, cb) {
    console.log(" =========================== inspectAndDescribeFiles =========================== ")
    console.log(files)
    async.map(files, (file, asyncCb) => {
      console.log(file)
      let resolvedFilePath = path.resolve(folderPath, file);
      inspectAndDescribeFile(resolvedFilePath, asyncCb);
    }, cb);
    console.log(" =========================== cb =========================== ")
    console.log(cb)
  }

function openFile(filePath) {
	return function() {
		shell.openExternal(filePath);
	};
}

module.exports = {
	getUsersHomeFolder: getUsersHomeFolder,
	getFilesInFolder: getFilesInFolder,
	inspectAndDescribeFiles: inspectAndDescribeFiles,
	openFile: openFile
}