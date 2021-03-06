const examples = document.body.querySelectorAll('.example');

for (example of examples) {
  if (example) {
    example.innerHTML += `
      <nav>
        <button name="run">Run</button>
      </nav>
    `;
    boring(example);
  }
}

const articles = document.body.querySelectorAll('article');

for (article of articles) {
  article.innerHTML += `
    <nav>
      <button name="first">First</button>
      <button name="previous">Previous</button>
      <button name="next">Next</button>
      <button name="last">Last</button>
      <button name="firm">ApostropheCMS</button>
    </nav>
  `;
}

function boring(el) {
  const boring = el.querySelector('.boring');
  if (boring) {
    el.querySelector('nav').innerHTML += `
      <button name="more">More</button>
      <button name="less">Less</button>
    `;
  }
}

document.body.addEventListener('click', (e) => {

  const article = e.target.closest('article');
  const name = e.target.getAttribute('name');

  if (name === 'run') {
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

  if (name === 'first') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const next = document.querySelector('article:first-of-type');
    next.classList.remove('inactive');
    next.classList.add('active');
  }

  if (name === 'previous') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const previous = article.previousElementSibling;
    previous.classList.remove('inactive');
    previous.classList.add('active');
  }

  if (name === 'next') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const next = article.nextElementSibling;
    next.classList.remove('inactive');
    next.classList.add('active');
  }

  if (name === 'last') {
    article.classList.remove('active');
    article.classList.add('inactive');
    const next = document.querySelector('article:last-of-type');
    next.classList.remove('inactive');
    next.classList.add('active');
  }

  if (name === 'more') {
    event.target.closest('.example').classList.add('more');
  }

  if (name === 'less') {
    event.target.closest('.example').classList.remove('more');
  }
  
  if (name === 'firm') {
    document.location = 'apostrophe.html';
  }
});
