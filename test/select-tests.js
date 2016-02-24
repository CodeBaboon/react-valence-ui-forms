'use strict';

jest.dontMock('../src/select');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Validation = require('../index');

describe('select', function() {

	var getSynchronousValidator = function(isValid, message) {
		return function(component, value) {
			return {
				isValid: isValid,
				message: message
			};
		};
	};

	it('implements the onValidate function', function() {

		var select = TestUtils.renderIntoDocument(
			<Validation.Select />
		);

		expect(select.onValidate).toBeDefined();

	});

	describe('render', function() {

		it('renders children', function() {

			var select = TestUtils.renderIntoDocument(
				<Validation.Select validateMessagePosition="below"><option>moose</option></Validation.Select>
			);

			expect(select.getDOMNode().firstChild.firstChild.textContent).toBe('moose');

		});

		pit('renders as invalid when validation returns isValid=false', function() {

			var select = TestUtils.renderIntoDocument(
				<Validation.Select validateMessagePosition="below" validators={getSynchronousValidator(false,'a message')} />
			);

			return select.validate().then(function(result) {
				expect(result.isValid).toBeFalsy();
				expect(result.message).toBe('a message');
				expect(select.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeTruthy();
			});

		});

		pit('renders as valid when validation returns isValid=true', function() {

			var select = TestUtils.renderIntoDocument(
				<Validation.Select validateMessagePosition="below" validators={getSynchronousValidator(true)} />
			);

			return select.validate().then(function(result) {
				expect(result.isValid).toBeTruthy();
				expect(select.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeNull();
			});

		});

	});

});
