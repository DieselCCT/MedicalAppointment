var lunr = require('lunr')
var index = lunr;

function resetIndex() {
	index = lunr(function() {
		this.field('file');
		this.field('type');
		this.ref('path');
	});
}

function addToIndex(file) {
	index.add(file);
}

function find(query, cb) {
	if (!index) { resetIndex(); }
	console.log(index)
	var results = index.search(query);
	console.log(results)
	cb(results);
}

module.exports = {
	addToIndex: addToIndex,
	find: find,
	resetIndex: resetIndex
};