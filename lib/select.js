'use strict';

var objectAssign = require('object-assign'),
	React = require('react'),
	ValidationMixin = require('./mixin');

var Select = React.createClass({

	mixins: [ValidationMixin],

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

		return this.renderContainer(
			React.createElement(
				'select',
				objectAssign(
					{},
					this.props,
					ariaProps, {
						onFocus: this.handleFocus,
						onBlur: this.handleBlur
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

module.exports = Select;
