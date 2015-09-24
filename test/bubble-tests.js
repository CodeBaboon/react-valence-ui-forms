'use strict';

jest.dontMock('../lib/bubble');

describe('bubble', function() {

	var React, TestUtils, Validation;

	beforeEach(function() {
		React = require( 'react/addons' );
		TestUtils = React.addons.TestUtils;
		Validation = require('../lib/index');
	});


	it('contains the bubble message', function() {

		var bubble = TestUtils.renderIntoDocument(
			<Validation.Bubble message="The bubble message."/>
		);

		expect(bubble.getDOMNode().textContent).toBe('The bubble message.');

	});

	it('has the field-bubble css class', function() {

		var bubble = TestUtils.renderIntoDocument(
			<Validation.Bubble message="The bubble message."/>
		);

		expect(bubble.getDOMNode().className).toBe('field-bubble field-bubble-hidden');

	});

	it('has the field-bubble-show css class when visible', function() {

		var bubble = TestUtils.renderIntoDocument(
			<Validation.Bubble isVisible={true} message="The bubble message."/>
		);

		expect(bubble.getDOMNode().className).toContain('field-bubble-show');

	});

});

