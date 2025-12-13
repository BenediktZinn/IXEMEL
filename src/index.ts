export class Writer {
  state: string;
  indent: number;
  indent_size: number;

  constructor(indent_size?: number) {
    this.state = "";
    this.indent = 0;
    this.indent_size = indent_size ?? 2;
  }


  put(s: string, indent?: number) {
    const indents = " ".repeat(this.indent_size);

    this.state += indents.repeat(indent ?? this.indent);
    this.state += s;
  }

  putLine(l: string, indent?: number) {
    this.put(l, indent);
    this.state += "\n";
  }

  toString() {
    return this.state;
  }
}

function escapeAttr(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeText(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export class Scope {
  tag_fields: Map<string, string|number>;
  tag_name: string;
  // allow text nodes (string) or nested Scopes
  children: (Scope | string)[];

  constructor(name: string, tag_fields?: Map<string, string|number>) {
    this.tag_fields = tag_fields ?? new Map();
    this.tag_name = name;
    this.children = [];
  }
  addChild(child: Scope | string) {
    this.children.push(child);
  }
  addText(text: string) {
    this.children.push(text);
  }

  toString(indent_size?: number) {
    const writer = new Writer(indent_size);
    this.compile(writer);
    return writer.toString();
  }


  protected compile(writer: Writer) {
    this.addStart(writer);
    this.compileChildren(writer);
    this.addEnd(writer);
  }

  addStart(writer: Writer) {
    let line = ``;
    line += `<${this.tag_name}`;
    for (const [key, value] of this.tag_fields) {
      if (value === "") {
        // valueless / boolean attribute
        line += ` ${key}`;
      } else if (typeof value === "string") {
        line += ` ${key}="${escapeAttr(value)}"`;
      } else {
        line += ` ${key}="${value}"`;
      }
    }
    if (this.children.length === 0) {
      line += "/";
    }
    line += ">";
    writer.putLine(line);
  }
  compileChildren(writer: Writer) {
    if (this.children.length === 0) {
      return;
    }
    writer.indent += 1;
    for (const child of this.children) {
      if (typeof child === 'string') {
        // text node
        writer.putLine(escapeText(child), writer.indent);
      } else {
        child.compile(writer);
      }

    }
    writer.indent -= 1;
  }

  addEnd(writer: Writer) {
    if (this.children.length === 0) {
      return;
    }
    const line = `</${this.tag_name}>`;
    writer.putLine(line);
  }
}
