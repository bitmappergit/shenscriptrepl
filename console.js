var shen; (new Shen).then((x) => { shen = x })
$(function () {
  var jqconsole = $('#console').jqconsole('', '~> ');
  jqconsole.Write("Welcome to the (basic) ShenScript REPL!\n\n", 'jqconsole-output')
  var startPrompt = function () {
    jqconsole.Prompt(true, function (input) {
      shen.exec(input).then((y) => {  
        if (y != null) {
          jqconsole.Write(y.toString() + '\n', 'jqconsole-output')
        }
      })
     startPrompt();
   });
 };
 startPrompt();
});
