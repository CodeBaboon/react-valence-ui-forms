# react-vui-forms

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][dependencies-image]][dependencies-url]

React component for forms with input validation.

## Installation

Install from NPM:
```shell
npm install react-vui-forms
```

## Usage

Require the components:
```javascript
var Forms = require('react-vui-forms');
```

Note: you'll need to include forms.css in order for the fields and validation bubbles to be styled/displayed.

### Input With a Single Validator

Use the Form.Input component and provide a validator.

```javascript
...
render: function() {
     return <label>
          Name
          <Forms.Input
            type="text"
            validators={
                Forms.Validators.required('Name is a required')
            } />
     </label>;
}
```

### Input With Multiple Validators

Use the Form.Input component and provide an array of validators.

```javascript
...
render: function() {
     return <label>
          Name
          <Forms.Input type="text"
            validators={[
                Forms.Validators.required('Name is a required'),
                Forms.Validators.patternMatch(/SomeName/, 'SomeName is the only acceptable name.')
            ]} />
     </label>;
}
```

### Triggering Validation

Validation can be triggered on a component by calling the validate function on the component. For example:

```javascript
...
render: function() {
     return <div>
        <label>
            Name
            <Forms.Input ref="userName" ... />
        </label>
        <button type="button" onClick={this.refs.userName.validate}>Validate</button>
     </div>;
}
```

### Built-in Validators

Forms.Validators.required - can be used to validate that a field contains a value. Initialize like this:

```javascript
// provide a message that will be displayed when a value has not be specified
var validator = Forms.Validators.required('Name is a required');

// optionally specify that whitespace should be trimmed before validating
var validator = Forms.Validators.required(
    'Name is a required', {
        whitespace: Forms.Validators.whitespaceOptions.TRIM
});
```

Forms.Validators.patternMatch - can be used to validate using a regular expression. Initialize like this:

```javascript
var validator = Forms.Validators.patternMatch(
    /SomeName/,
    'SomeName is the only valid name.'
);
```

Forms.Validators.invalidValue - can be used to indicate an invalid value. This can be useful if a value is known to be invalid, perhaps after an attempt to save. Initialize like this:

```javascript
var validator = Forms.Validators.invalidValue(
    'SomeOtherName',
    'SomeOtherName is already in use.'
);
```

### HTML5 Constraints

HTML5 constraints can be used for validation, however note that they are not supported in all browsers. If used, the message provided by the user-agent is displayed in the validation bubble (and may or may not be informative to users with assisitive technology such as screen readers).

```javascript
...
render: function() {
     return <label>
          Name
          <Forms.Input type="text" required />
     </label>;
}
```

### Custom Validators

Custom validators must return an object with the isValid and optionally a message (if invalid) properties:

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
[dependencies-url]: https://david-dm.org/brightspace/react-valence-ui-forms
[dependencies-image]: https://img.shields.io/david/Brightspace/react-valence-ui-forms.svg

