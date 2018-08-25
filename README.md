# pamt

A simple javascript library for function parameter type definition.

The initial idea of this repo was to design something similar to react props types. Of course there are already those things like
flow and typescript, but those require you to use extra compilers and significantly change your project files.
This one is an easy-to-use, -turn-on and -turn-off (see examples below).

### How to use

Suppose you have a simple node-js module, like this:

### person.utils.js

```javascript
    module.exports = {
        toFullName: (first, last) => `${first} ${last.substr(0, 1)}.`,
        isAdult: age => age > 18,
        createPerson: (name, age, catPerson) => ({ name, age, preferences: { cats: catPerson } }),
    };
```

Then you want to add some runtime parameter validation, to do that you create a pamt definition file somewhere:

### person.utils.pamt.js

```javascript
    const {def, TYPES} = require('pamt');

    module.exports = def({
        toFullName: [TYPES.STR, TYPES.STR],
        isAdult: [TYPES.NUM],
        createPerson: [TYPES.STR, TYPES.NUM, TYPES.BOOL]
    });
```

And now you need to add one extra line to your module and a few more characters to make everything work. And the end your module should be as this one:

### person.utils.js

```javascript
    const pamt = require('./person.utils.pamt'); // require the file with definitions

    // wrap your module with the imported pamt function
    module.exports = pamt({
        toFullName: (first, last) => `${first} ${last.substr(0, 1)}.`,
        isAdult: age => age > 18,
        createPerson: (name, age, catPerson) => ({ name, age, preferences: { cats: catPerson } }),
    });
```

That's it. When you're sick and tired of error messages related to the function parameter validation, you just remove the last changes.

### Todos

 - add some configurations, so it will be possible to disable the validations through some configs
 - add ability to use pamt with nested properties
 - add tests
 - add extra validation like not-null, not-undefined
 - test with default parameters

License
----
MIT