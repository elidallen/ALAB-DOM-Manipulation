const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

const subMenuEl = document.querySelector('#sub-menu'); // Select and cache the sub-menu element
subMenuEl.style.height = '100%'; // Set the height of subMenuEl to '100%'
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'; // Set the background color using a CSS custom property
subMenuEl.classList.add('flex-around'); // Add the 'flex-around' class to subMenuEl
subMenuEl.style.position = 'absolute'; // Set the CSS position property to 'absolute'
subMenuEl.style.top = '0'; // Set the CSS top property to '0'

const menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

const topMenuLinks = topMenuEl.querySelectorAll('a');

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = ''; // Clear the current contents of the submenu
  subLinks.forEach((subLink) => {
    const subLinkElement = document.createElement('a');
    subLinkElement.setAttribute('href', subLink.href);
    subLinkElement.textContent = subLink.text;
    subMenuEl.appendChild(subLinkElement);
  });
}

topMenuEl.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;

  if (e.target.textContent === 'about') {
    // Special handling for the "ABOUT" link
    mainEl.innerHTML = '<h1>About</h1>';
  } else {
    // Toggle the 'active' class for the clicked link
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      subMenuEl.style.top = '100%'; // Hide the submenu
    } else {
      // Remove the 'active' class from other links
      topMenuLinks.forEach((link) => link.classList.remove('active'));
      e.target.classList.add('active');

      // Handle submenu based on the link
      const linkIndex = menuLinks.findIndex((link) => link.text === e.target.textContent);
      if (linkIndex >= 0) {
        const subLinks = menuLinks[linkIndex].subLinks;

        // Check if the clicked link has sub-links
        if (subLinks) {
          subMenuEl.style.top = '0'; // Show the submenu
          buildSubmenu(subLinks);
        } else {
          subMenuEl.style.top = '100%'; // Hide the submenu
        }
      }
    }
  }
});

// Add the menu links to topMenuEl
for (const link of menuLinks) {
  const anchor = document.createElement('a');
  anchor.setAttribute('href', link.href);
  anchor.textContent = link.text;
  topMenuEl.appendChild(anchor);
}

subMenuEl.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default behavior of the clicked link
  if (e.target.tagName !== 'A') return; // Return if the element clicked was not an <a> element

  // Log the content of the <a> element
  console.log(e.target.textContent);

  // Set the CSS top property of subMenuEl to 0
  subMenuEl.style.top = '0';

  // Remove the 'active' class from each <a> element in topMenuLinks
  topMenuLinks.forEach((link) => link.classList.remove('active'));

  // Update the contents of mainEl within an <h1> to the contents of the <a> element clicked within subMenuEl
  mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;
});