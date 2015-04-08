'use strict';

var classNames = require('classnames'),
	React = require('react'),
	Emitter = require('react-frau-events'),
	Bubble = require('./bubble'),
	Q = require('q');

var ValidationMixin = {

	mixins: [
		Emitter.ForEvent('validate')
	],

	propsTypes: {
		validateLive: React.PropTypes.bool
	},

	getInitialState: function() {
		return {
			"validation:hasInteracted": false,
			"validation:isValid": true
		};
	},

	handleBlur: function(e) {
		this.forceUpdate();
		this.validate().then(function(result) {
			this.setState({
				"validation:hasInteracted": true,
				"validation:isValid": result.isValid
			});
		}.bind(this));
		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	},

	handleChange: function(e) {
		if (this.props.validateLive) {
			this.validate().then(function(result) {
				this.setState({
					"validation:isValid": result.isValid
				});
			}.bind(this));
		}
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	},

	handleFocus: function(e) {
		this.forceUpdate();
		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
	},

	handleKeyUp: function(e) {
		if (this.props.validateLive && this.state['validation:hasInteracted']) {
			this.validate().then(function(result) {
				this.setState({
					"validation:isValid": result.isValid
				});
			}.bind(this));
		}
		if (this.props.onKeyUp) {
			this.props.onKeyUp(e);
		}
	},

	shouldDisplayMessage: function() {
		return !this.state['validation:isValid'] &&
			this.state['validation:hasInteracted'] &&
			this.hasFocus && this.hasFocus();
	},

	renderContainer: function(innerView) {

		var classes = classNames({
			'field-interacted': this.state['validation:hasInteracted'],
			'field-invalid': !this.state['validation:isValid']
		});

		var bubble = React.createElement(
			Bubble,
			{
				message: this.state['validation:message'],
				isVisible: this.shouldDisplayMessage()
			}
		);

		return React.DOM.div(
			{ className: classes },
			[ innerView, bubble ]
		);

	},

	handleValidator: function(validator) {
		var	deferred = Q.defer();

		if (validator === undefined || validator === null) {
			deferred.resolve({ isValid: true, message: "No validator."});
			return deferred.promise;
		}

		if (typeof validator === 'function') {

			var currentValue;
			if (this.getValue) {
				currentValue = this.getValue();
			}
			var validatorResult = validator.call(validator, this, currentValue);

			// validationResult could be a validation result result or a promise
			// for a validation result... either we can resolve with it
			deferred.resolve(validatorResult);

		} else if (validator.constructor === Object) {

			deferred.resolve(validator);

		}

		return deferred.promise;
	},

	handleValidators: function(validators) {

		var promises = [];
		for(var i=0; i<validators.length; i++) {
			promises.push(this.handleValidator(validators[i]));
		}

		return Q.allSettled(promises).then(function(validatorResults) {
			var isValid = true, message;
			for(var i=0; i<validatorResults.length; i++) {
				if (!validatorResults[i].value.isValid) {
					isValid = false;
					message = validatorResults[i].value.message;
					break;
				}
			}
			return {isValid: isValid, message: message};
		});

	},

	onValidate: function(relatedComponent) {

		if (!relatedComponent ||
			!relatedComponent.isMounted() ||
			!this.isMounted() ||
			!relatedComponent.getDOMNode().contains(this.getDOMNode())) {
			return;
		}

		var	deferred = Q.defer();
		var validators = this.props.validators;

		var handleResult = function(result) {
			result.component = this;
			this.setState({
				"validation:hasInteracted": true,
				"validation:isValid": result.isValid,
				"validation:message": result.message
			});
			deferred.resolve(result);
		}.bind(this);

		if (this.defaultValidate) {
			var defaultResult = this.defaultValidate();
			if (!defaultResult.isValid) {
				handleResult(defaultResult);
				return deferred.promise;
			}
		}

		if (validators) {

			var validatorHandler;
			if (validators.constructor === Array) {
				validatorHandler = this.handleValidators;
			} else {
				validatorHandler = this.handleValidator;
			}

			validatorHandler(validators)
				.then(function(validatorResult) {
					handleResult(validatorResult);
				});

		} else {
			handleResult({isValid: true});
		}

		return deferred.promise;

	}

};

module.exports = ValidationMixin;
