# grunt-stripper

This module is based off https://github.com/philip/grunt-strip-code release 1.2 with added support for HTML comment blocks.

This module should perform identically to (grunt-stripe-code)[https://github.com/philip/grunt-strip-code], except if it encounters a HTML file (.html or .htm), instead of looking for the following (javascript-style) comment syntax:

```js
/* test-code */
removeMeInProduction();
/* end-test-code */

doNotRemoveMe();
```

it will instead look for the following (html-style) comment syntax:

```js
<!-- test-code -->
removeMeInProduction();
<!-- end-test-code -->

doNotRemoveMe();
```
