'use strict';

jest.dontMock('../lib/textarea');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Validation = require('../lib/index');

describe('textarea', function() {

	var getSynchronousValidator = function(isValid, message) {
		return function(component, value) {
			return {
				isValid: isValid,
				message: message
			};
		};
	};

	it('implements the onValidate function', function() {

		var textarea = TestUtils.renderIntoDocument(
			<Validation.Textarea />
		);

		expect(textarea.onValidate).toBeDefined();

	});

	describe('render', function() {

		it('renders children', function() {

			var textarea = TestUtils.renderIntoDocument(
				<Validation.Textarea defaultValue={"some content"} />
			);

			expect(textarea.getDOMNode().firstChild.textContent.replace('\n', '')).toBe('some content');

		});

		it('renders aria-required when HTML5 required attribute is specified', function() {

			var textarea = TestUtils.renderIntoDocument(
				<Validation.Textarea required />
			);

			expect(textarea.getDOMNode().firstChild.getAttribute('aria-required')).toBeTruthy();

		});

		it('does not render aria-required when HTML5 required attribute is not specified', function() {

			var textarea = TestUtils.renderIntoDocument(
				<Validation.Textarea />
			);

			expect(textarea.getDOMNode().firstChild.getAttribute('aria-required')).toBeNull();

		});

		pit('renders as invalid when validation returns inValid=false', function() {

			var textarea = TestUtils.renderIntoDocument(
				<Validation.Textarea validators={getSynchronousValidator(false,'a message')} />
			);

			return textarea.validate().then(function(result) {
				expect(result.isValid).toBeFalsy();
				expect(result.message).toBe('a message');
				expect(textarea.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeTruthy();
			});

		});

		pit('renders as valid when validation returns inValid=true', function() {

			var textarea = TestUtils.renderIntoDocument(
				<Validation.Textarea validators={getSynchronousValidator(true)} />
			);

			return textarea.validate().then(function(result) {
				expect(result.isValid).toBeTruthy();
				expect(textarea.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeNull();
			});

		});

	});

});
