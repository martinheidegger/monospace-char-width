var test = require('tape')
var width = require('../')
var last = 59

function w (t, str, expected) {
  var code = str.charCodeAt(0)
  t.equal(width(code), expected)
  t.equal(width(code, last), expected)
  last = code
}

function wSurr (t, codes, expected) {
  t.equal(width(codes[1], codes[0]), expected)
}

test('regular width', function (t) {
  w(t, 'a', 1)
  w(t, 'z', 1)
  w(t, ' ', 1)
  w(t, '1', 1)
  w(t, '9', 1)
  w(t, '-', 1)
  w(t, '$', 1)
  w(t, '.', 1)
  t.end()
})

test('double width', function (t) {
  w(t, 'あ', 2)
  w(t, 'ん', 2)
  w(t, 'ア', 2)
  w(t, 'ン', 2)
  w(t, '…', 2)
  w(t, '…', 2)
  w(t, '\u2026', 2) // ambiguous char should be full width
  t.end()
})

test('surrogate pair', function (t) {
  wSurr(t, [0xD800, 0xDC00], 1) // U+10000 LINEAR B SYLLABLE B008 A (first non-BMP code point)    ( half width )
  wSurr(t, [0xD840, 0xDC0B], 2)
  wSurr(t, [0xD869, 0xDEB2], 2)
  wSurr(t, [0xD840, 0xDC0B], 2)
  t.end()
})

test('surrogate alone', function (t) {
  t.equal(width(0xD800), 0)
  t.end()
})
