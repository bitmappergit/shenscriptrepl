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


$(async function () {
  var jqconsole = $('#console').jqconsole('', '');
  var out = (new OutStream(jqconsole))
  var shen = await new Shen({InStream, OutStream, stoutput: out, sterror: out})
  //console.log(shen.valueOf("shen.*tc*"))
  await shen.assign("*history*", 0)
  await shen.exec("(define runsh Parsed -> (trap-error (shen.toplevel (read-from-string Parsed)) (/. E (shen.toplevel-display-exception E))))")
  let evalShen = await shen.caller("runsh")

  //jqconsole.Write("Welcome to the (basic) ShenScript REPL!\n\n", 'jqconsole-output')
  await shen.exec('(do (shen.initialise_environment) (shen.credits))')
  //jqconsole.Write("\n\n", 'jqconsole-output')

  var startPrompt = async () => {
    let prompt = await shen.exec('(make-string "~%~%(~A~A) " (value *history*) (if (= (value shen.*tc*) true) "+" "-"))')
    jqconsole.SetPromptLabel(prompt)
    jqconsole.Prompt(true, async (input) => {
      evalShen(input)
      await shen.exec("(set *history* (+ (value *history*) 1))")
      startPrompt();
    });
  };
  startPrompt();
});
