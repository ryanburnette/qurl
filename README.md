Qurl
====

**Qurl** is a browser JavaScript library for getting and setting query parameters. This
library makes use of [Window Location][2] and [pushState][1] to operate.

Usage
-----

Create a new Qurl instance, accepts an optional queryString as a parameter to the constructor.

```js
var url = new Qurl(/* queryString */);
// or
var url = Qurl(/* queryString */);
```

Get the query parameters as an object.

```js
obj = url.query();
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

Version History
---------------

+ v0.1.2 - 2014-03-19
  + Only use pushState when supported

+ v0.1.1 - 2014-02-08
  + Fixed a bug where the last query parameter could not be removed

+ v0.1.0 - 2014-02-07
  + Initial


[1]: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window.location
