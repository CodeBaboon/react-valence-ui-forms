'use strict';

var classNames = require('classnames'),
	React = require('react');

var Bubble = React.createClass({

	componentDidUpdate: function(prevProps, prevState) {

		if (!this.props.isVisible) {
			return;
		}

		// this hack is necessary in order for alert to be announced in IE with Jaws
		var node = this.getDOMNode();
		node.style.visibility='hidden';
		node.style.visibility='visible';

	},

	render: function() {

		var bubbleProps = {
			className: classNames({
				'field-bubble': true,
				'field-bubble-show': this.props.isVisible
			})
		};

		if (this.props.isVisible) {
			bubbleProps.role = 'alert';
		}

		return React.DOM.div(
			bubbleProps,
			React.DOM.span(
				{ className: 'field-bubble-content' },
				this.props.message
			)
		);

	}
});

module.exports = Bubble;
