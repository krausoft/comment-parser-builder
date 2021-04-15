const crb = require("../src/comment-regexp-builder.js");

const example0 = () => {
  const lineCommentTag = crb.createStartTag("//");
  console.log(lineCommentTag.test("  // some comment "));
  //=>true
  console.log(lineCommentTag.innerText("  // some comment "));
  //=>" some comment "

  const startBlock = crb.createStartTag("/*");
  const endBlock = crb.createEndTag("*/");

  console.log(startBlock.test("  /* some comment */ "));
  //=>true
  console.log(startBlock.innerText("  /* some comment */  "));
  //=>" some comment */"

  console.log(endBlock.test("  /* some comment */ "));
  //=>true
  console.log(endBlock.innerText("  /* some comment */  "));
  //=>"  /* some comment "
};

example0();

const example01 = () => {
  console.log("01----------------");

  const startBlock = crb.createStartTag("/*");
  const endBlock = crb.createEndTag("*/");

  console.log(startBlock.test(" x /* some comment */  "));
  //=>false
  console.log(startBlock.innerText(" x /* some comment */  "));
  //=>null
  console.log(endBlock.test(" x /* some comment */  "));
  //=>true
  console.log(endBlock.innerText(" x /* some comment */  "));
  //=>" x /* some comment "

  console.log(startBlock.test("  /* some comment */ x "));
  //=>true
  console.log(startBlock.innerText("  /* some comment */ x "));
  //=>" some comment */ x "
  console.log(endBlock.test("  /* some comment */ x "));
  //=>false
  console.log(endBlock.innerText("  /* some comment */ x "));
  //=>null
};

example01();

//

const example1 = () => {
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

  const commentTag = crb.createStartTag(";");

  const onlySpaceTag = crb.createStartTag("");
  const notCommentNorSpace = (s) =>
    !commentTag.test(s) && !onlySpaceTag.test(s);

  const content = configText.split("\n").filter(notCommentNorSpace);
  console.log(content);
};

// example1();

//

const example2 = () => {
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

  //print all line comments
  console.log(lineComments);
  //=> [
  //   ' //  my 2nd code',
  //   '  // adds two numbers together',
  //   '  //- simple and unconvenient',
  //   '    // TODO: remove'
  // ]

  //print only the content of line comments
  console.log(lineComments.map(lineCommentTag.innerText));
  //=> [
  //   '  my 2nd code',
  //   ' adds two numbers together',
  //   '- simple and unconvenient',
  //   ' TODO: remove'
  // ]
};

//example2();

//

const example3 = () => {
  const src = `
   
  /**
   * Swaps first two items in array. Returns a new array, the input array remains untouched.
   *
   * swapA :: [a] -> [a]
   *
   * @example
   * //::: swapA
   * let arr = [1, 2, 3], orig = [1, 2, 3]    //define some variables in the test
   * //
   * assert.deepEqual(swapA(arr), [2, 1, 3])  //swaps first two items
   * assert.deepEqual(arr, orig)              //preserves the original array
   *
   */
  const swapA = ([a, b, ...tail]) => [b, a, ...tail]
  
  module.exports = {
    swapA,              //only exported fields can be tested
  }
`;

  const docCommntStart = crb.createStartTag("/**");
  const docCommntEnd = crb.createEndTag("*/");
  const docCommntMiddle = crb.createStartTag("*");

  const isDocComment = (s) =>
    docCommntStart.test(s) || docCommntEnd.test(s) || docCommntMiddle.test(s);

  const innerInDocComment = (s) => {
    if (docCommntStart.test(s)) return docCommntStart.innerText(s);
    if (docCommntEnd.test(s)) return docCommntEnd.innerText(s);
    return docCommntMiddle.innerText(s);
  };

  const commentInner = src
    .split("\n")
    .filter(isDocComment)
    .map(innerInDocComment);

  console.log(commentInner);
};

//example3();
