const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

const menuLinks = [
    { href: 'link1.html', text: 'Link 1' },
    { href: 'link2.html', text: 'Link 2' },
    { href: 'link3.html', text: 'Link 3' },
  ];
  
  for (const link of menuLinks) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', link.href);
    anchor.textContent = link.text;
    topMenuEl.appendChild(anchor);
  }