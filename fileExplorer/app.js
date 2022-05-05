'use strict';

var fileSystem = require('./fileSystem');
var userInterface = require('./userInterface');
var search = require('./search');

function main() {

	var folderPath = fileSystem.getUsersHomeFolder();
	console.log(folderPath)
	userInterface.loadDirectory(folderPath)(window);
	userInterface.bindSearchField(function (event) {
		var query = event.target.value;
		if (query === '') {
			userInterface.resetFilter();
		} else {
			search.find(query, userInterface.filterResults);
		}
	});
}

window.onload = main;