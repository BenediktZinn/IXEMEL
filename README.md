# IXEMEL

[![Build Status](https://github.com/benediktZinn/IXEMEL/actions/workflows/ci.yml/badge.svg)](https://github.com/benediktZinn/IXEMEL/actions) [![Codecov](https://codecov.io/gh/benediktZinn/IXEMEL/branch/main/graph/badge.svg)](https://codecov.io/gh/benediktZinn/IXEMEL) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

IXEMEL is a lightweight TypeScript library for programmatically generating XML documents.

## Features

- Simple API for building XML structures
- Automatic XML escaping for both text content and attributes
- Support for nested elements and text nodes
- Configurable indentation
- Type-safe TypeScript implementation

## Installation

```bash
npm install BenediktZinn/IXEMEL
```

## Usage

### Basic Example

```typescript
import { Scope } from 'benediktzinn/ixemel';

// Create a simple self-closing tag
const scope = new Scope("test", new Map([["a", "1"]]));
console.log(scope.toString());
// Output: <test a="1"/>
```

### Nested Elements

```typescript
import { Scope } from 'benediktzinn/ixemel';

// Create nested elements
const parent = new Scope("parent", new Map([["id", "1"]]));
const child = new Scope("child", new Map([["name", "example"]]));
parent.addChild(child);

console.log(parent.toString());
// Output:
// <parent id="1">
//   <child name="example"/>
// </parent>
```

### Text Content

```typescript
import { Scope } from 'benediktzinn/ixemel';

// Add text content (automatically escaped for &, <, >)
const paragraph = new Scope("p");
paragraph.addText("Tom & Jerry <3> \" '");
console.log(paragraph.toString());
// Output:
// <p>
//   Tom &amp; Jerry &lt;3&gt; " '
// </p>
```

### Custom Indentation

```typescript
import { Scope } from 'benediktzinn/ixemel';

const scope = new Scope("root");
scope.addChild(new Scope("child"));

// Use 4 spaces for indentation instead of default 2
console.log(scope.toString(4));
```

## API

### `Scope`

Default XML elements.

#### Constructor
- `new Scope(name: string, tag_fields?: Map<string, string|number>)`

#### Methods
- `addChild(child: Scope | string)`: Add a nested element or text node
- `addText(text: string)`: Add a text node (automatically escaped)
- `toString(indent_size?: number)`: Generate the XML string representation

## License

MIT
