'use strict';

var classNames = require('classnames'),
	React = require('react');

var Bubble = React.createClass({

	render: function() {

		var bubbleProps = {
			'id': this.props.id,
			className: classNames({
				'field-bubble': true,
				'field-bubble-hidden': !this.props.isVisible && this.props.message,  
				'field-bubble-show': this.props.isVisible
			})
		};

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
