class OutStream {
  constructor(console) {
    this.console = console
    this.write = (x) => {
      this.console.Write(String.fromCharCode(x), 'jqconsole-output')
    }
  }
}

class InStream {
  constructor() {
    this.read = () => {}
    this.close = () => {}
  }
}

$(function () {
  var jqconsole = $('#console').jqconsole('', '~> ');
  var shen; (new Shen({InStream, OutStream, stoutput: (new OutStream(jqconsole))})).then((x) => { shen = x });
  jqconsole.Write("Welcome to the (basic) ShenScript REPL!\n\n", 'jqconsole-output')
  var startPrompt = function () {
    jqconsole.Prompt(true, function (input) {
      shen.exec(input).then((y) => {  
        if (y != null) {
          if (typeof(y) === "string") {
            jqconsole.Write('"' + y + '"' + '\n', 'jqconsole-output')
          } else {
            jqconsole.Write(y.toString() + '\n', 'jqconsole-output')
          }
        }
      })
     startPrompt();
   });
 };
 startPrompt();
});
