'use strict';

var React = require('react'),
	ValidationMixin = require('./mixin');

var Input = React.createClass({

	mixins: [ValidationMixin],

	defaultValidate: function() {
		var inputNode = this.getDOMNode().firstChild;
		if (!inputNode.checkValidity) {
			return { isValid: true };
		}
		return {
			isValid: inputNode.checkValidity(),
			message: inputNode.validationMessage
		};
	},

	getValue: function() {
		if (!this.isMounted()) {
			return;
		}
		return this.getDOMNode().firstChild.value;
	},

	hasFocus: function() {
		if (!this.isMounted()) {
			return false;
		}
		return (document.activeElement === this.getDOMNode().firstChild);
	},

	render: function() {

		var ariaProps = {};

		if (!this.state['validation:isValid']) {
			ariaProps['aria-invalid'] = true;
		}

		if (this.props.required) {
			ariaProps['aria-required'] = true;
		}

		return this.renderContainer(
			<input {...this.props} {...ariaProps}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onKeyUp={this.handleKeyUp} />
			);

	},

	tryFocus: function() {
		if (!this.isMounted()) {
			return false;
		}
		this.getDOMNode().firstChild.focus();
		return true;
	},

	validate: function() {
		return this.onValidate(this);
	}

});

module.exports = Input;
