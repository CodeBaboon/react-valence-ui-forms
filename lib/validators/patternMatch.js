'use strict';

var patternMatchValidator = function( pattern, message ) {
	if(pattern === undefined) {
		return {isValid: true};
	}
	return function(component, value) {
		return {
			isValid: pattern.test(value),
			message: message
		};
	};
};
module.exports = patternMatchValidator;
