# comment-regexp-builder

RegExp wrapper for comment-like lines

- custom tags, from strings ('/\*', '\*/', '//', ...)
- leading and trailing space tolerant
- opening, closing and section tags (ini files section, for example)
- extract other text from the tag line

## Examples

```js
const crb = require("comment-regexp-builder");

const lineCommentTag = crb.createStartTag("//");
console.log(lineCommentTag.test("  // some comment "));
//=>true
console.log(lineCommentTag.innerText("  // some comment "));
//=>" some comment "
```

more line comment example

```js
const crb = require("comment-regexp-builder");

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

const lineCommentTag = crb.createStartTag("//");
const lineComments = src.split("\n").filter(lineCommentTag.test);

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
const crb = require("comment-regexp-builder");

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

const sectionTag = crb.createSectionTag("[", "]");
const sectionNames = configText
  .split("\n")
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

## Limitations

Cannot detects blocks inside text:

```js
const a = 10; //cannot detect this comment
const b = /*cannot detect this comment*/ true;
```
