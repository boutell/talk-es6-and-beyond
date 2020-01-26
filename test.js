(function() {
        const realConsole = console;
        {
          const console = {
            log(...args) {
              const output = args.join('
');
              const display = document.createElement('pre');
              display.classList.add('output');
              display.innerText = output;
              example.appendChild(display);
            }
          };
          var cat = 'louis';
var i;

for (i = 1; (i <= 10); i++) {
  var cat = 'loopy cat #' + i;
  console.log(cat);
}
console.log(cat); // cat #10, not louis!
          
        }
      })();
