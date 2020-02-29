var esprima = require('esprima');
var js = require('./source');

var data = esprima.tokenize(JSON.stringify(js));
let lastProp = '';

const toCamel = (str) => {
	return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
		if (p2) {
			return p2.toUpperCase();
		}
		return p1.toLowerCase();        
	});
};

const format = (lines) => {
	console.log('{\n');
	Object.keys(lines).forEach((prop) => {
		console.log(`\t${prop}: "${lines[prop]}",`);
	});
	console.log('}');
}

const lines = {};
data.forEach((row) => {
	if (row.type === 'Punctuator') {
		return;
	}
	
	if (lastProp === '') {
		lastProp = toCamel(row.value.replace(/["']/g, ''));
	} else {
		lines[lastProp] = row.value.replace(/["']/g, '');
		lastProp = '';
	}
});

format(lines);