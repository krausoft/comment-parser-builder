const crb = require("../src/comment-regexp-builder.js");

describe("empty startTag  ('')", () => {
  test("empty startTag recognizes empty line", () => {
    const tg = crb.createStartTag("");
    expect(tg.test("")).toBe(true);
  });

  test("empty startTag recognizes white-chars line", () => {
    const tg = crb.createStartTag("");
    expect(tg.test(" ")).toBe(true);
    expect(tg.test("  ")).toBe(true);
    expect(tg.test("\t")).toBe(true);
    expect(tg.test("  \t")).toBe(true);
    expect(tg.test("  \t ")).toBe(true);
  });

  test("empty startTag omits non-white-chars line", () => {
    const tg = crb.createStartTag("");
    expect(tg.test("a")).toBe(false);
    expect(tg.test(" a")).toBe(false);
    expect(tg.test(" something ")).toBe(false);
  });
});

//

describe("simple startTag (':')", () => {
  test("simple StartTag omits an empty line", () => {
    const tg = crb.createStartTag(":");
    expect(tg.test("")).toBe(false);
  });

  test("simple StartTag omits line that does not contain it", () => {
    const tg = crb.createStartTag(":");
    expect(tg.test("something")).toBe(false);
  });

  test("simple startTag omits line that does not contain it as the first non-white character", () => {
    const tg = crb.createStartTag(":");
    expect(tg.test("-:")).toBe(false);
    expect(tg.test(" b:")).toBe(false);
  });

  test("simple startTag recognizes lines with leading and trailing white chars", () => {
    const tg = crb.createStartTag(":");
    expect(tg.test(":")).toBe(true);
    expect(tg.test(" :")).toBe(true);
    expect(tg.test(": ")).toBe(true);
    expect(tg.test(" : \t")).toBe(true);
  });
});

//

describe("complex startTag ('/**')", () => {
  test("complex startTag omits an empty line", () => {
    const tg = crb.createStartTag("/**");
    expect(tg.test("")).toBe(false);
  });

  test("complex StartTag omits line that does not contain it", () => {
    const tg = crb.createStartTag("/**");
    expect(tg.test("something")).toBe(false);
  });

  test("complex startTag omits line that does not contain it as the first non-white character", () => {
    const tg = crb.createStartTag("/**");
    expect(tg.test("-/**")).toBe(false);
    expect(tg.test(" abcd/**")).toBe(false);
  });

  test("complex startTag recognizes lines with leading and trailing white chars", () => {
    const tg = crb.createStartTag("/**");
    expect(tg.test("/**")).toBe(true);
    expect(tg.test("  /**")).toBe(true);
    expect(tg.test("/** ")).toBe(true);
    expect(tg.test(" /** \t ")).toBe(true);
  });
});

//

describe("startTag innerText method", () => {
  test("empty startTag innerText returns null", () => {
    const tg = crb.createStartTag("");
    expect(tg.innerText(" // this is a description  ")).toBe(null);
  });

  test("line with startTag innerText is recognized", () => {
    const tg = crb.createStartTag("//");
    expect(tg.test(" // this is a description  ")).toBe(true);
  });

  test("innerText recognizes its tag description", () => {
    const tg = crb.createStartTag("//");
    expect(tg.innerText(" // this is a description  ")).toEqual(
      " this is a description  "
    );
    // expect(tg.regexp().exec(" // this is a description  ")[1]).toEqual(
    //   " this is a description  "
    // );
  });

  test("innerText returns empty string for startTag with trailing end of line", () => {
    const tg = crb.createStartTag("//");
    expect(tg.innerText(" //")).toEqual("");
    // expect(tg.regexp().exec(" //")[1]).toEqual("");
  });

  test("innerText returns null for non-matching line", () => {
    const tg = crb.createStartTag("//");
    expect(tg.innerText("")).toEqual(null);
    // expect(tg.regexp().exec("")).toEqual(null);

    expect(tg.innerText("abcd")).toEqual(null);
    // expect(tg.regexp().exec("abcd")).toEqual(null);
  });

  test("innerText returns null for a null line", () => {
    const tg = crb.createStartTag("//");
    expect(tg.innerText(null)).toEqual(null);
    // expect(tg.regexp().exec(null)).toEqual(null);
  });
});

describe("regex method (':')", () => {
  test("simple StartTag omits an empty line", () => {
    const tg = crb.createStartTag(":");
    expect(tg.regexp().test("")).toBe(false);
  });

  test("simple StartTag omits line that does not contain it", () => {
    const tg = crb.createStartTag(":");
    expect(tg.regexp().test("something")).toBe(false);
  });

  test("simple startTag omits line that does not contain it as the first non-white character", () => {
    const tg = crb.createStartTag(":");
    expect(tg.regexp().test("-:")).toBe(false);
    expect(tg.regexp().test(" b:")).toBe(false);
  });

  test("simple startTag recognizes lines with leading and trailing white chars", () => {
    const tg = crb.createStartTag(":");
    expect(tg.regexp().test(":")).toBe(true);
    expect(tg.regexp().test(" :")).toBe(true);
    expect(tg.regexp().test(": ")).toBe(true);
    expect(tg.regexp().test(" : \t")).toBe(true);
  });
});

//--------------------------------------------------------------------------------------------------------------

describe("empty EndTag  ('')", () => {
  test("empty EndTag recognizes empty line", () => {
    const tg = crb.createEndTag("");
    expect(tg.test("")).toBe(true);
  });

  test("empty EndTag recognizes white-chars line", () => {
    const tg = crb.createEndTag("");
    expect(tg.test(" ")).toBe(true);
    expect(tg.test("  ")).toBe(true);
    expect(tg.test("\t")).toBe(true);
    expect(tg.test("  \t")).toBe(true);
    expect(tg.test("  \t ")).toBe(true);
  });

  test("empty EndTag omits non-white-chars line", () => {
    const tg = crb.createEndTag("");
    expect(tg.test("a")).toBe(false);
    expect(tg.test(" a")).toBe(false);
    expect(tg.test(" something ")).toBe(false);
  });
});

//

describe("simple EndTag (':')", () => {
  test("simple EndTag omits an empty line", () => {
    const tg = crb.createEndTag(":");
    expect(tg.test("")).toBe(false);
  });

  test("simple EndTag omits line that does not contain it", () => {
    const tg = crb.createEndTag(":");
    expect(tg.test(" some thing ")).toBe(false);
  });

  test("simple EndTag omits line that contains non-white character after it", () => {
    const tg = crb.createEndTag(":");
    expect(tg.test(":-")).toBe(false);
    expect(tg.test(" :b")).toBe(false);
    expect(tg.test("  :something")).toBe(false);
  });

  test("simple EndTag recognizes lines with leading and trailing white chars", () => {
    const tg = crb.createEndTag(":");
    expect(tg.test(":")).toBe(true);
    expect(tg.test(" :")).toBe(true);
    expect(tg.test(": ")).toBe(true);
    expect(tg.test(" : ")).toBe(true);
  });
});

//

describe("complex EndTag ('**/')", () => {
  test("complex EndTag omits an empty line", () => {
    const tg = crb.createEndTag("**/");
    expect(tg.test("")).toBe(false);
  });

  test("complex EndTag omits line that does not contain it", () => {
    const tg = crb.createEndTag("**/");
    expect(tg.test("something")).toBe(false);
  });

  test("complex EndTag omits line that contains non-white character after it", () => {
    const tg = crb.createEndTag("**/");
    expect(tg.test(" **/-")).toBe(false);
    expect(tg.test("/**/ b")).toBe(false);
    expect(tg.test("**/something")).toBe(false);
  });

  test("complex EndTag recognizes itself", () => {
    const tg = crb.createEndTag("**/");
    expect(tg.test("**/")).toBe(true);
  });

  test("complex EndTag recognizes lines with leading and trailing characters", () => {
    const tg = crb.createEndTag("**/");
    expect(tg.test(" **/")).toBe(true);
    expect(tg.test("**/ ")).toBe(true);
    expect(tg.test(" **/ ")).toBe(true);
  });
});

//

describe("EndTag innerText method", () => {
  test("empty endTag innerText returns null", () => {
    const tg = crb.createEndTag("");
    expect(tg.innerText(" // this is a description  ")).toBe(null);
  });

  test("line with endTag innerText is recognized", () => {
    const tg = crb.createEndTag("*/");
    expect(tg.test("this is a description*/")).toBe(true);
  });

  test("innerText recognizes its tag description", () => {
    const tg = crb.createEndTag("*/");
    expect(tg.innerText(" this is a description  */")).toEqual(
      " this is a description  "
    );
    // expect(tg.regexp().exec(" this is a description  */")[1]).toEqual(
    //   " this is a description  "
    // );
  });

  test("innerText returns empty string for EndTag at the start of line", () => {
    const tg = crb.createEndTag("*/");
    expect(tg.innerText("*/")).toEqual("");
    // expect(tg.regexp().exec("*/")[1]).toEqual("");
  });

  test("innerText returns null for non/matching line", () => {
    const tg = crb.createEndTag("*/");
    expect(tg.innerText("")).toEqual(null);
    // expect(tg.regexp().exec("")).toEqual(null);

    expect(tg.innerText("abcd")).toEqual(null);
    // expect(tg.regexp().exec("abcd")).toEqual(null);
  });

  test("innerText returns null for a null line", () => {
    const tg = crb.createEndTag("//");
    expect(tg.innerText(null)).toEqual(null);
    // expect(tg.regexp().exec(null)).toEqual(null);
  });
});

//--------------------------------------------------------------------------------------------------------------

describe("empty SectionTag  ('')", () => {
  test("empty SectionTag recognizes empty line", () => {
    const tg = crb.createSectionTag("", "");
    expect(tg.test("")).toBe(true);
  });

  test("empty SectionTag recognizes white-chars line", () => {
    const tg = crb.createSectionTag("", "");
    expect(tg.test(" ")).toBe(true);
    expect(tg.test("  ")).toBe(true);
    expect(tg.test("\t")).toBe(true);
    expect(tg.test("  \t")).toBe(true);
    expect(tg.test("  \t ")).toBe(true);
  });

  test("empty SectionTag omits non-white-chars line", () => {
    const tg = crb.createSectionTag("", "");
    expect(tg.test("a")).toBe(false);
    expect(tg.test(" a")).toBe(false);
    expect(tg.test(" something ")).toBe(false);
  });
});

//

describe("complex SectionTag ('-<', '>-')", () => {
  test("complex SectionTag omits an empty line", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.test("")).toBe(false);
  });

  test("complex SectionTag omits line that does not contain it", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.test("something")).toBe(false);
  });

  test("complex SectionTag omits line that contains non-white character after it", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.test(" **/-")).toBe(false);
    expect(tg.test("/**/ b")).toBe(false);
    expect(tg.test("**/something")).toBe(false);
  });

  test("complex SectionTag recognizes itself", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.test("-<>-")).toBe(true);
    expect(tg.test("-<abcd>-")).toBe(true);
  });

  test("complex SectionTag recognizes lines with leading and trailing characters", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.test(" -<  >-")).toBe(true);
    expect(tg.test("-<  >- ")).toBe(true);
    expect(tg.test(" -<  >- ")).toBe(true);
  });
});

//

describe("SectionTag innerText method", () => {
  test("empty-defined SectionTag innerText returns null", () => {
    const tg = crb.createSectionTag("", "");
    expect(tg.innerText(" -< this is a description >- ")).toBe(null);
  });

  test("line with SectionTag innerText is recognized", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.test("-<this is a description>-")).toBe(true);
  });

  test("SectionTag innerText recognizes its tag description", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.innerText(" -< this is a description  >-")).toEqual(
      " this is a description  "
    );
    // expect(tg.regexp().exec("-< this is a description  >-")[1]).toEqual(
    //   " this is a description  "
    // );
  });

  test("SectionTag with empty content: innerText returns empty string", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.innerText("-<>-")).toEqual("");
    // expect(tg.regexp().exec("  -<>- ")[1]).toEqual("");
  });

  test("SectionTag innerText returns null for non/matching line", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.innerText("")).toEqual(null);
    // expect(tg.regexp().exec("")).toEqual(null);

    expect(tg.innerText("abcd")).toEqual(null);
    // expect(tg.regexp().exec("abcd")).toEqual(null);
  });

  test("SectionTag innerText returns null for a null line", () => {
    const tg = crb.createSectionTag("-<", ">-");
    expect(tg.innerText(null)).toEqual(null);
    // expect(tg.regexp().exec(null)).toEqual(null);
  });
});

//--------------------------------------------------------------------------------------------------------------

describe("MatchAllTag", () => {
  test("MatchAllTag recognizes empty string", () => {
    const tg = crb.matchAllTag;
    expect(tg.test("")).toBe(true);
  });

  test("MatchAllTag recognizes whiteChar string", () => {
    const tg = crb.matchAllTag;
    expect(tg.test(" \t")).toBe(true);
  });

  test("MatchAllTag recognizes some random one-line string", () => {
    const tg = crb.matchAllTag;
    expect(tg.test("a")).toBe(true);
    expect(tg.test(" -< this is a description  >-")).toBe(true);
  });

  test("MatchAllTag innerText is the same as the original one-line text", () => {
    const tg = crb.matchAllTag;
    expect(tg.innerText("")).toEqual("");
    expect(tg.innerText("a")).toEqual("a");
    expect(tg.innerText("\t ")).toEqual("\t ");
    expect(tg.innerText(" -< this is a description  >-")).toEqual(
      " -< this is a description  >-"
    );

    // expect(tg.innerText(` -< this is a de\nscription  >-`)).toEqual(
    //   ` -< this is a de\nscription  >-`
    // );
  });
});
