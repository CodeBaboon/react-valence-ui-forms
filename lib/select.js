'use strict';

var React = require('react'),
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
			<select {...this.props} {...ariaProps}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}>
				{this.props.children}
			</select>
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
