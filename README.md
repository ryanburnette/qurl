Qurl
====

**Qurl** is a browser JavaScript library for getting and setting query parameters. This
library makes use of [Window Location][2] and [pushState][1] to operate.

Usage
-----

Create a new Qurl object.

```js
var url = Qurl.create();
```

There is only one method, `query` which performs the available tasks.

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
url.query('key','value');
```

Delete a query parameter by passing false as the second argument after the key.

```js
url.query('key',false);
```

Limitations
-----------

There are perfectly acceptable scenarios which are not possible in Qurl due to known
limitations. Some of these include:

+ Nested queries
+ Special characters
+ Arrays

If you'd like to make this library more supportive, please send a pull request with the
update without breaking existing functionality.


[1]: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window.location