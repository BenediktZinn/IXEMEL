import { Writer, Scope } from '../src/index'
test("writer", () => {
  const writer = new Writer() ;
  writer.putIndent("a", 5);
  expect(writer.toString()).toBe("     a");
});


test("scope start 1", () => {
  const writer = new Writer() ;
  const scope = new Scope("test", new Map([["a", "1"]]), 0, writer);
  scope.compile();
  expect(writer.toString()).toBe("<test a=1 />\n");
})



test("scope start 2", () => {
  const writer = new Writer() ;
  const scope = new Scope("test", new Map([["a", "1"]]), 2, writer);
  scope.compile();
  expect(writer.toString()).toBe("  <test a=1 />\n");
})

