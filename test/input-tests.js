'use strict';

jest.dontMock('../src/input');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Validation = require('../index');

describe('input', function() {

	var getSynchronousValidator = function(isValid, message) {
		return function(component, value) {
			return {
				isValid: isValid,
				message: message
			};
		};
	};

	it('implements the onValidate function', function() {

		var input = TestUtils.renderIntoDocument(
			<Validation.Input type="text" />
		);

		expect(input.onValidate).toBeDefined();

	});

	describe('render', function() {

		it('renders aria-required when HTML5 required attribute is specified', function() {

			var input = TestUtils.renderIntoDocument(
				<Validation.Input type="text" required />
			);

			expect(input.getDOMNode().firstChild.getAttribute('aria-required')).toBeTruthy();

		});

		it('does not render aria-required when HTML5 required attribute is not specified', function() {

			var input = TestUtils.renderIntoDocument(
				<Validation.Input type="text" />
			);

			expect(input.getDOMNode().firstChild.getAttribute('aria-required')).toBeNull();

		});

		pit('renders as invalid when validation returns inValid=false', function() {

			var input = TestUtils.renderIntoDocument(
				<Validation.Input type="text" validators={getSynchronousValidator(false,'a message')} />
			);

			return input.validate().then(function(result) {
				expect(result.isValid).toBeFalsy();
				expect(result.message).toBe('a message');
				expect(input.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeTruthy();
			});

		});

		pit('renders as valid when validation returns inValid=true', function() {

			var input = TestUtils.renderIntoDocument(
				<Validation.Input type="text" validators={getSynchronousValidator(true)} />
			);

			return input.validate().then(function(result) {
				expect(result.isValid).toBeTruthy();
				expect(input.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeNull();
			});

		});

	});

});
