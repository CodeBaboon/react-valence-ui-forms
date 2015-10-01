'use strict';

var invalidValueValidator = function(invalidValue, message) {
	if (invalidValue === undefined) {
		return function() {
			return {isValid: true};
		};
	}
	return function(component, value) {
		return {
			isValid: (value !== invalidValue),
			message: message
		};
	};
};
module.exports = invalidValueValidator;
