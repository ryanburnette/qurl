# [Qurl](https://github.com/ryanburnette/qurl)

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/Qurl)
[![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/qurl)

A browser JavaScript library for getting and setting query parameters. Makes use of [Window
Location][2] and [pushState][1].

## Usage

Include directly in the browser, or with a module bundler.

```js
// bundler approach
var Qurl = require('@ryanburnette/qurl');
// or include the Js and Qurl will be an attribute of window
```

Create a new instance, accepts an optional queryString as a parameter to the constructor.

```js
var url = new Qurl(/* queryString */);
// or
var url = Qurl(/* queryString */);
```

Get the query parameters as an object.

```js
obj = url.query();
```

Get query parameters as a string

```js
url.toString();
```

Get the value of a single query parameter by passing its key as an argument.

```js
key = url.query('key');
```

Set the value for a query parameter.

```js
url.query('key', 'value');
url.query('Robby', {
  age: 20,
  friends : ['Martin', 'Mole', 'Mindy'],
  stuffs : [{ foo: 'bar' }, { gum: 'ball' }],
  even : { deeper : down : [1,2,3] }
});
```

Delete a query parameter.

```js
url.remove('key');
url.removeAll();
```

Toggle auto updating of URL history

```js
url.updateHistory = true;
```

[1]: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window.location
