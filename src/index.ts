
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


export interface WriterConfiguration{
  indent_size: number;
  
}

export class Scope{
  indent_level: number;
  tag_fields: Map<string, string>;
  tag_name: string;
  children: Scope[];

  constructor(name: string, tag_fields: Map<string, string>, indent_level: number, writer: Writer){
    this.indent_level = indent_level;
    this.tag_fields = tag_fields;
    this.tag_name = name;
    this.children = [];
    this.writer = writer;
  }

  compile(){
    addStart();
    compileChildren();
    addEnd();
  }

  addStart(){
    const line = ``;
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



  addEnd(){
    if (this.children.length === 0){
      return;
    }
    let const = `</${this.tag_name}>`;
    this.writer.putLine(line, this.indent_level);
  }

}

