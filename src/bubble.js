'use strict';

var classNames = require('classnames'),
	messagePositions = require('./messagePositions'),
	React = require('react');

var Bubble = React.createClass({

	componentDidUpdate: function() {

		if (!this.props.anchorId) {
			return;
		}

		var anchor = document.getElementById(this.props.anchorId);
		if (!anchor) {
			return;
		}

		var anchorRect = anchor.getBoundingClientRect();

		/* eslint-disable no-cond-assign */
		var getOffset = function(elem) {
			var offset = { top: 0, left: 0 };
			do {
				if (!isNaN(elem.offsetTop)) {
					offset.top += elem.offsetTop;
				}
				if (!isNaN(elem.offsetLeft)) {
					offset.left += elem.offsetLeft;
				}
			} while (elem = elem.offsetParent);
			return offset;
		};
		/* eslint-enable no-cond-assign */

		var offset = getOffset(anchor);
		var bubble = React.findDOMNode(this);
		var bubbleRect = bubble.getBoundingClientRect();

		if (this.props.position !== messagePositions.ABOVE) {
			bubble.style.top = (offset.top + anchorRect.height + 10) + 'px';
		} else {
			bubble.style.top = (offset.top - bubbleRect.height - 10) + 'px';
		}

		if (document.body.getAttribute('dir') !== 'rtl') {
			bubble.style.left = offset.left + 'px';
		} else {
			bubble.style.left = offset.left + anchorRect.width - bubbleRect.width + 'px';
		}

	},

	render: function() {

		var bubbleProps = {
			'id': this.props.id,
			className: classNames({
				'field-bubble': true,
				'field-bubble-hidden': !this.props.isVisible && this.props.message,
				'field-bubble-show': this.props.isVisible
			})
		};

		var contentClassName = this.props.position !== 'above' ?
			'field-bubble-content' : 'field-bubble-content-above';

		return React.DOM.div(
			bubbleProps,
			React.DOM.span(
				{ className: contentClassName },
				this.props.message
			)
		);

	}
});

module.exports = Bubble;
