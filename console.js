class OutStream {
  constructor(console) {
    this.console = console
    this.write = (x) => {
      this.console.Write(String.fromCharCode(x), 'jqconsole-output')
    }
  }
}
/*
class InStream {
  constructor() {
    this.read = () => {}
    this.close = () => {}
  }
}
*/

$(async function () {
  var jqconsole = $('#console').jqconsole('', '');
  var out = (new OutStream(jqconsole))
  var shen = await new Shen({OutStream, stoutput: out, sterror: out})
  //console.log(shen.valueOf("shen.*tc*"))
  await shen.assign("*history*", 0)
  await shen.assign("shen.*home-directory*", "/shenscriptrepl/")
  await shen.exec("(define runsh Parsed -> (trap-error (shen.toplevel (read-from-string Parsed)) (/. E (shen.toplevel-display-exception E))))")
  await shen.exec("(define input-parses? Str -> (let Chars (map (function string->n) (explode Str)) Parsed (compile (/. X (shen.<st_input> X)) Chars (/. E $$$input-incomplete)) (shen-script.boolean.shen->js (not (= Parsed $$$input-incomplete)))))")
  let inputParses = await shen.caller("input-parses?")
  await shen.define("shen.pause-for-user", async () => {})
  //await shen.exec("(define runsh Parsed -> (trap-error (shen.toplevel (read-from-string Parsed)) (/. E (shen.toplevel-display-exception E))))")
  let evalShen = shen.caller("runsh")

  jqconsole.Write("Welcome to the ShenScript REPL!\nThe <div> on the right is available under the id workspace.\n", 'jqconsole-output')
  await shen.exec('(do (shen.initialise_environment) (shen.credits))')
  //jqconsole.Write("\n\n", 'jqconsole-output')
  var startPrompt = async () => {
    let prompt = await shen.exec('(make-string "~%~%(~A~A) " (value *history*) (if (= (value shen.*tc*) true) "+" "-"))')
    jqconsole.SetPromptLabel(prompt)
    jqconsole.Prompt(true, async (input) => {
      evalShen(input)
      shen.exec("(set *history* (+ (value *history*) 1))")
      startPrompt()
    }, async (input, next) => {
      if (input.trim() === "") { return next(0) }
      const result = await inputParses(input)
      if (result) {
        return next(false)
      } else {
        return next(0)
      }
    },
    true);
  };
  startPrompt();
});
