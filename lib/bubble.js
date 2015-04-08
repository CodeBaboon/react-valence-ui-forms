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

		var classes = classNames({
			'field-bubble': true,
			'field-bubble-show': this.props.isVisible
		});

		var aria = {};
		if (this.props.isVisible) {
			aria.role = 'alert';
		}

		return <div {...aria} className={classes}>
			<span className="field-bubble-content">{this.props.message}</span>
		</div>;

	}
});

module.exports = Bubble;
