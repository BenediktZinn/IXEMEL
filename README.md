# IXEMEL

A TypeScript library for generating XML with proper indentation.

## Installation

```bash
npm install benediktZinn/IXEMEL
```

## Usage

```typescript
import { Writer, Scope } from 'benediktZinn/IXEMEL';

const writer = new Writer();
const scope = new Scope("element", new Map([["attr", "value"]]), 0);
scope.addStart(writer);
console.log(writer.toString()); // <element attr=value />\n
```

## License

MIT
