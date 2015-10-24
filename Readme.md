[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat)](LICENSE.md)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/monospace-char-width.svg)](https://badge.fury.io/js/monospace-char-width)

# monospace-char-width

`monospace-char-width` is a JavaScript CommonJS package that deals with the fact that some characters in monospace font environments (like terminals) are displayed with the size of two characters while others occupy the space of one character.

It is derived (forked) from [visualwidth-js](https://github.com/tokuhirom/visualwidth-js) which is custom implemented and seems better tested with japanese than the similar package [wcwidth](https://github.com/timoxley/wcwidth) which is a derivate of [http://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c]. It differes from both of those packages by only returning the width of one character (as integer!) which is important for performance
reasons.


## Installation & Usage
Install the package with `npm i monospace-char-width --save` and pass the character you want to test like this:

```JavaScript
var mcw = require('monospace-char-width')

function charSize(string, pos) {
    mcw(string.charCodeAt(pos), pos > 0 ? string.charCodeAt(pos-1) : 0)
}

charSize('abcd', 0) // 1
```

## Surrogates or Why two character codes?
The size of some characters depends on surrogates which means that depending on the character before their size changes. For it to work appropriately you need to pass-in both the current character code and the one before that.

