'use strict';

var whitespaceOptions = require('./whitespaceOptions');

var requiredValidator = function(message, options) {
	return function(component, value) {

		var isValid;

		// Default to not trim when validating (consistent with HTML5 required constraint)
		if (options && options.whitespace === whitespaceOptions.TRIM) {
			isValid = value && value.trim().length > 0;
		} else {
			isValid = value && value.length > 0;
		}

		return {
			isValid: isValid,
			message: message
		};

	};
};
module.exports = requiredValidator;
