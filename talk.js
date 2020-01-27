const articles = document.body.querySelectorAll('article');

for (article of articles) {
  const old = article.querySelector('.old');
  old.innerHTML += `
    <nav>
      <button name="run">Run</button>
      <button name="new">Upgrade!</button>
    </nav>
  `;
  const n = article.querySelector('.new');
  n.innerHTML += `
    <nav>
      <button name="run">Run</button>
      <button name="old">Downgrade</button>
    </nav>
  `;
  article.innerHTML += `
    <nav>
      <button name="first">First</button>
      <button name="previous">Previous</button>
      <button name="next">Next</button>
      <button name="last">Last</button>
    </nav>
  `;
}

document.body.addEventListener('click', (e) => {

  const article = e.target.closest('article');

  if (e.target.getAttribute('name') === 'run') {
    const example = e.target.closest('.example');
    let display = example.querySelector('.output');
    if (display) {
      example.removeChild(display);
    }
    display = document.createElement('pre');
    display.classList.add('output');
    example.appendChild(display);
    let code = '';
    const boring = example.querySelector('pre.boring');
    if (boring) {
      code += boring.childNodes[0].nodeValue;
    }
    code += example.querySelector('pre:not(.boring)').childNodes[0].nodeValue;
    const wrappedCode = `
      (function() {
        const realConsole = console;
        {
          const console = {
            log(...args) {
              const output = args.map(arg => {
                if ((typeof arg) === 'object') {
                  return JSON.stringify(arg, null, '  ');
                } else {
                  return arg;
                }
              }).join('\\r\\n');
              display.innerText += output + '\\r\\n';
            }
          };
          ${code}
        }
      })();
    `;
    try {
      eval(wrappedCode);
    } catch (e) {
      display.innerText += e.toString();
    }
  }

  if (e.target.getAttribute('name') === 'new') {
    article.querySelector('.new').classList.remove('inactive');
    article.querySelector('.old').classList.remove('active');
    article.querySelector('.new').classList.add('active');
    article.querySelector('.old').classList.add('inactive');
  }

  if (e.target.getAttribute('name') === 'old') {
    article.querySelector('.old').classList.remove('inactive');
    article.querySelector('.new').classList.remove('active');
    article.querySelector('.old').classList.add('active');
    article.querySelector('.new').classList.add('inactive');
  }

  if (e.target.getAttribute('name') === 'first') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const next = document.querySelector('article:first-of-type');
    next.classList.remove('inactive');
    next.classList.add('active');
  }

  if (e.target.getAttribute('name') === 'previous') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const previous = article.previousElementSibling;
    previous.classList.remove('inactive');
    previous.classList.add('active');
  }

  if (e.target.getAttribute('name') === 'next') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const next = article.nextElementSibling;
    next.classList.remove('inactive');
    next.classList.add('active');
  }

  if (e.target.getAttribute('name') === 'last') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const next = document.querySelector('article:last-of-type');
    next.classList.remove('inactive');
    next.classList.add('active');
  }
});
