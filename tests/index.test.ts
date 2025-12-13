import { Writer, Scope } from '../src/index'

test("writer", () => {
  const writer = new Writer();
  writer.put("a", 2);
  expect(writer.toString()).toBe("    a");
});


test("scope start 1", () => {
  const scope = new Scope("test", new Map([["a", "1"]]));
  expect(scope.toString()).toBe("<test a=\"1\"/>\n");
})


test("scope start 2", () => {
  const scope = new Scope("test");
  expect(scope.toString()).toBe("<test/>\n");
})


test("scope start 3", () => {
  const scope = new Scope("test", new Map([["a", "1"], ["b", "2"]]));
  expect(scope.toString()).toBe("<test a=\"1\" b=\"2\"/>\n");
})


test("scoping with children 1", () => {
  const scop1 = new Scope("test1", new Map([["a", "1"]]));
  scop1.addChild(new Scope("test2", new Map([["b", "2"]])));

  expect(scop1.toString())
    .toBe(
      "<test1 a=\"1\">\n" +
      "  <test2 b=\"2\"/>\n" +
      "</test1>\n"
    )

})

test("setting indent size", () => {
  const scop1 = new Scope("test1", new Map([["a", "1"]]));
  scop1.addChild(new Scope("test2", new Map([["b", "2"]])));

  expect(scop1.toString(4))
    .toBe(
      "<test1 a=\"1\">\n" +
      "    <test2 b=\"2\"/>\n" +
      "</test1>\n"
    )

})


test("scoping with children 2", () => {
  const scop1 = new Scope("test1", new Map([["a", "1"]]));
  const scop2 = new Scope("test2", new Map([["b", "2"]]));
  scop2.addChild(new Scope("test3", new Map([["c", "3"]])));
  scop1.addChild(scop2);

  expect(scop1.toString())
    .toBe(
      "<test1 a=\"1\">\n" +
      "  <test2 b=\"2\">\n" +
      "    <test3 c=\"3\"/>\n" +
      "  </test2>\n" +
      "</test1>\n"
    )

})

test("scoping with multiple children, multiple nested children", () => {
  const scop1 = new Scope("test1", new Map([["a", "1"]]));
  const scop2 = new Scope("test2", new Map([["b", "2"]]));
  scop2.addChild(new Scope("test3", new Map([["c", "3"]])));
  scop2.addChild(new Scope("test4", new Map([["d", "4"]])));
  scop1.addChild(scop2);
  scop1.addChild(new Scope("test5", new Map([["e", "5"]])));

  expect(scop1.toString())
    .toBe(
      "<test1 a=\"1\">\n" +
      "  <test2 b=\"2\">\n" +
      "    <test3 c=\"3\"/>\n" +
      "    <test4 d=\"4\"/>\n" +
      "  </test2>\n" +
      "  <test5 e=\"5\"/>\n" +
      "</test1>\n"
    )
})


test("text escaping", () => {
  const scop = new Scope("p");
  scop.addText("Tom & Jerry <3> \" '");
  expect(scop.toString()).toBe("<p>\n  Tom &amp; Jerry &lt;3&gt; \" '\n</p>\n");
})

test("boolean/valueless attribute", () => {
  const scop = new Scope("input", new Map([["disabled", ""]]));
  expect(scop.toString()).toBe("<input disabled/>\n");
})

test("mixed children and text", () => {
    const scop = new Scope("div");

    scop.addChild(new Scope("h1"));
    scop.addText("Hello & Welcome");
    const pScope = new Scope("p");
    pScope.addText("This is a paragraph with <special> characters & symbols.");
    scop.addChild(pScope);

    expect(scop.toString())
        .toBe(
        "<div>\n" +
        "  <h1/>\n" +
        "  Hello &amp; Welcome\n" +
        "  <p>\n" +
        "    This is a paragraph with &lt;special&gt; characters &amp; symbols.\n" +
        "  </p>\n" +
        "</div>\n"
        );
})
