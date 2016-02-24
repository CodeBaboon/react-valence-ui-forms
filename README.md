# react-vui-forms

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

React component for forms with input validation.

## Installation

Install from NPM:
```shell
npm install react-vui-forms
```

Install from Bower:
```shell
bower install react-vui-forms
```

## Components

Import the style:

```scss
@import "bower_components/react-vui-forms/forms.scss"; // or...

@import "node_modules/react-vui-forms/forms.scss";
```

Require the components:
```javascript
var Forms = require('react-vui-forms');
```

Note: you'll need to include ***forms.css*** in order for the fields and validation bubbles to be styled/displayed.

```javascript
var MyComponent = React.createClass({
    render: function() {
        return <Forms.Form>
            <label>Name
                <Forms.Input type="text" ... />
            </label>
            <label>Type
                <Forms.Select ... >
                    <option>...</option>
                </Forms.Select>
            </label>
            <label>About
                <Forms.Textarea ... />
            </label>
        </Forms.Form>;
    }
});
```

## Validation

### Input With a Single Validator

Assign a validator function to the validators property.

```javascript
var MyComponent = React.createClass({
    render: function() {
        return <label>
            Name
            <Forms.Input type="text"
                validators={ Forms.Validators.required('Name is a required') } />
        </label>;
    }
});
```

### Input With Multiple Validators

Assign an array of validator functions to the validators property.

```javascript
var MyComponent = React.createClass({
    render: function() {
        return <label>
            Name
            <Forms.Input type="text"
                validators={[
                    Forms.Validators.required('Name is a required'),
                    Forms.Validators.patternMatch(
                        /SomeName/,
                        'SomeName is the only acceptable name.'
                    )
                ]} />
        </label>;
    }
});
```

### Positioning Message Bubbles

The default position for validation bubbles is beneath the invalid form element, except for `Forms.Select` which displays the message above so that it does not interfere with selection.  If necessary, the `validateMessagePosition` attribute can be used to explicitly indicate the message should be displayed above or below the invalid element:

```javascript
var MyComponent = React.createClass({
    render: function() {
        return <label>
            Name
            <Forms.Input type="text"
                validateMessagePosition="above"
                validators={ Forms.Validators.required('Name is a required') } />
        </label>;
    }
});
```

Or the validation message can be anchored off of an entirely different element by specifying the `validateMessageAnchorId` attribute:

```javascript
var MyComponent = React.createClass({
    render: function() {
        return <label id="myInputLabel">
            Name
            <Forms.Input type="text"
                validateMessagePosition="above"
                validateMessageAnchorId="myInputLabel"
                validators={ Forms.Validators.required('Name is a required') } />
        </label>;
    }
});
```

### Triggering Validation

Validation will be done when a field loses focus, however it can be manually trigger on a component (ex. Input, Form, etc.) by calling the validate function. For example:

```javascript
var MyComponent = React.createClass({
    render: function() {
        return <Forms.Form ref="myForm">
            <label>Name
                <Forms.Input ... />
            </label>
            <button type="button" onClick={this.refs.myForm.validate}>Validate</button>
        </Forms.Form>;
    }
});
```

### Built-in Validators

#### Forms.Validators.required

Provide a message that will be displayed when a value has not be specified.

```javascript
var validator = Forms.Validators.required('Name is required.');
```

Optionally specify how whitespace should be handled (TRIM vs KEEP) when validating.

```javascript
var validator = Forms.Validators.required(
    'Name is a required', {
        whitespace: Forms.Validators.whitespaceOptions.TRIM
    }
);
```

#### Forms.Validators.patternMatch

Provide a regular expression and a message to be displayed when the value is invalid.

```javascript
var validator = Forms.Validators.patternMatch(
    /SomeName/,
    'SomeName is the only valid name.'
);
```

#### Forms.Validators.invalidValue

Create a validator for a known invalid value by specifying the invalid value and a message to be displayed when the value matches that value.

```javascript
var validator = Forms.Validators.invalidValue(
    'SomeOtherName',
    'SomeOtherName is already in use.'
);
```

### HTML5 Constraints

HTML5 constraints can be used for validation, however they are not supported in all browsers so you may prefer to use your own validators. If used, the message provided by the user-agent is displayed in the validation bubble (and may or may not be informative to users with assisitive technology such as screen readers).

```javascript
var MyComponent = React.createClass({
    render: function() {
        return <label>Name
            <Forms.Input type="text" required />
        </label>;
    }
});
```

### Custom Validators

A custom validator is a function that accepts the ***component*** and ***value*** arguments respectively. The ***component*** is the instance of the React component being validated, and the ***value*** corresponds to the current value of the element.

The validator can return either a result, or a promise for a result. The result must be a JavaScript object containing the ***isValid*** and optionally ***message*** (if invalid) properties.

```javascript
{
    isValid: true/false,
    message: "specify a bubble message when isValid is false"
}
```

#### Custom Synchronous Validators

```javascript
var validator = function(component, value) {
    var pattern = new RegExp("...","g");
    return {
        isValid: pattern.test(value),
        message: "That's not a valid value."
    };
};
```

#### Custom Asynchronous Validators

The following sample uses a setTimeout call to mock an async validator.

```javascript
var validator = function(component, value) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve({
            isValid: false,
            message: 'You shall not continue.'
        });
    }, 1000);
    return deferred.promise;
};
```

## Contributing

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and contributions should make use of them. See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for more information.

[npm-url]: https://www.npmjs.org/package/react-vui-forms
[npm-image]: https://img.shields.io/npm/v/react-vui-forms.svg
[ci-url]: https://travis-ci.org/Brightspace/react-valence-ui-forms
[ci-image]: https://img.shields.io/travis-ci/Brightspace/react-valence-ui-forms.svg
[coverage-url]: https://coveralls.io/r/Brightspace/react-valence-ui-forms?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/react-valence-ui-forms.svg
[dependencies-url]: https://david-dm.org/brightspace/react-valence-ui-forms
[dependencies-image]: https://img.shields.io/david/Brightspace/react-valence-ui-forms.svg
