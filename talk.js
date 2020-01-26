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
    const code = example.querySelector('pre').childNodes[0].nodeValue;
    const wrappedCode = `
      (function() {
        const realConsole = console;
        {
          const console = {
            log(...args) {
              const output = args.join('\\r\\n');
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
});
