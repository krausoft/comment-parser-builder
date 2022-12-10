# comment-regexp-builder

RegExp wrapper for comment-like lines

- custom tags, from strings ('/\*', '\*/', '//', ...)
- leading and trailing space tolerant
- opening, closing and section tags (ini files section, for example)
- extract text from the tag

## Examples

```js
const crb = require('comment-regexp-builder');

const lineCommentTag = crb.createStartTag('//');
console.log(lineCommentTag.test('  // some comment '));
//=>true
console.log(lineCommentTag.innerText('  // some comment '));
//=>" some comment "
```

more line comment example

```js
const crb = require('comment-regexp-builder');

const src = `
 //  my 2nd code

  // adds two numbers together
  //- simple and unconvenient
  const plus = (a, b) => {
    return a + b
  }
 module.exports = {
    // TODO: remove
    plus,
}
`;

const lineCommentTag = crb.createStartTag('//');
const lineComments = src.split('\n').filter(lineCommentTag.test);

console.log(lineComments);
//=> [
//   ' //  my 2nd code',
//   '  // adds two numbers together',
//   '  //- simple and unconvenient',
//   '    // TODO: remove'
// ]

console.log(lineComments.map(lineCommentTag.innerText));
//=> [
//   '  my 2nd code',
//   ' adds two numbers together',
//   '- simple and unconvenient',
//   ' TODO: remove'
// ]
```

ini file example

```js
const crb = require('comment-regexp-builder');

const configText = `
; ini file

maxcount=4

 [common]

   ; in seconds
   timeout=10
; url to check
   url=http://something

[extras ] 
 
  maxtry=3

[user] 
name=John
  email=j@j

`;

const sectionTag = crb.createSectionTag('[', ']');
const sectionNames = configText
  .split('\n')
  .filter(sectionTag.test)
  .map(sectionTag.innerText);

console.log(sectionNames);
//=> [ 'common', 'extras ', 'user' ]
```

## API

One can create three types of tags:

- createStartTag(tagString)
- createEndTag(tagString)
- createSectionTag(leftPartString, rightPartString)

Each of tags has these methods:

- regexp(): returns its internal RegExp object
- test(line: string): a shorthand for its internal RegExp object test method
- innerText(line: string): If tag is found at the line, returns the text that belongs to it

There is also useful constant tag object: `matchAllTag`, which meets the following:

- matchAllTag.test(s) === true //for all strings s
- matchAllTag.innerText(s) === s //for all strings s

## Limitations

To recognize lines with tags, these criteria must be met:

- Start-Tag must be the first non-white character at the line
- End-Tag must be the last non-white character at the line
- Section Tag pair can be surrounded only by white chars

```js
const crb = require('comment-regexp-builder');

const startBlock = crb.createStartTag('/*');
const endBlock = crb.createEndTag('*/');

console.log(startBlock.test(' x /* some comment */  '));
//=>false
console.log(startBlock.innerText(' x /* some comment */  '));
//=>null
console.log(endBlock.test(' x /* some comment */  '));
//=>true
console.log(endBlock.innerText(' x /* some comment */  '));
//=>" x /* some comment "

console.log(startBlock.test('  /* some comment */ x '));
//=>true
console.log(startBlock.innerText('  /* some comment */ x '));
//=>" some comment */ x "
console.log(endBlock.test('  /* some comment */ x '));
//=>false
console.log(endBlock.innerText('  /* some comment */ x '));
//=>null
```

Because of that, this library cannot detects blocks inside the text:

```js
const a = 10; //cannot detect this comment
const b = /*cannot detect this comment*/ true;
```
