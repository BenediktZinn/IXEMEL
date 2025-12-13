
export class Writer{
    state:string;

    constructor(){
      this.state = "";
    }


  putIndent(s: string, indent: number){
    
    this.state += " ".repeat(indent);
    this.state += s;
  }

  putLine(l: string, indent: number){
    this.putIndent(l, indent);
    this.state +="\n";
  }
  
  toString(){
    return this.state;
  }
}

export class Scope{
  indent_level: number;
  tag_fields: Map<string, string>;
  tag_name: string;
  children: Scope[];

  constructor(name: string, tag_fields: Map<string, string>, indent_level: number){
    this.indent_level = indent_level;
    this.tag_fields = tag_fields;
    this.tag_name = name;
    this.children = [];
  }

  addStart(writer: Writer){
    var line = ``;
    line += `<${this.tag_name} `;
    for (const [key,value] of this.tag_fields){
      line +=`${key}=${value} `;
    }
    if (this.children.length === 0){
      line += "/";
    }
    line += ">"
    writer.putLine(line, this.indent_level);
  }

}

