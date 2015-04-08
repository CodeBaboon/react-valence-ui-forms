'use strict';

var objectAssign = require('object-assign'),
	React = require('react'),
	ValidationMixin = require('./mixin');

var Textarea = React.createClass({

	mixins: [ValidationMixin],

	defaultValidate: function() {
		var textareaNode = this.getDOMNode().firstChild;
		if (!textareaNode.checkValidity) {
			return { isValid: true };
		}
		return {
			isValid: textareaNode.checkValidity(),
			message: textareaNode.validationMessage
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
			React.DOM.textarea(
				objectAssign(
					{},
					this.props,
					ariaProps, {
						onFocus: this.handleFocus,
						onBlur: this.handleBlur,
						onKeyUp: this.handleKeyUp
					}
				),
				this.props.children
			)
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

module.exports = Textarea;
