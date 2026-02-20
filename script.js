const html = document.documentElement;
const menu = document.querySelector('.menu');
const menuIcon = menu.querySelector('img');
const navMenu = document.querySelector('.navMenu');
const ICON_OPEN = './images/icon-close.svg';
const ICON_CLOSE = './images/icon-hamburger.svg';

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('show');
  menu.setAttribute('aria-expanded', isOpen);
  menuIcon.src = isOpen ? ICON_OPEN : ICON_CLOSE;

  isOpen
    ? html.addEventListener('click', clickOutside)
    : html.removeEventListener('click', clickOutside);
}

const clickOutside = {
  handleEvent: function (event) {
    const clickMenu =
      menu.contains(event.target) || navMenu.contains(event.target);
    if (!clickMenu) {
      navMenu.classList.remove('show');
      menu.setAttribute('aria-expanded', false);
      menuIcon.src = ICON_CLOSE;
      html.removeEventListener('click', clickOutside);
    }
  },
};

function closeMenu() {
  navMenu.classList.remove('show');
  menu.setAttribute('aria-expanded', false);
  menuIcon.src = ICON_CLOSE;
  html.removeEventListener('click', clickOutside);
}

function handleResize() {
  const BREAKPOINT = 700;
  if (window.innerWidth > BREAKPOINT) closeMenu();
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    closeMenu();
  }
});

menu.addEventListener('click', toggleMenu);
window.addEventListener('resize', handleResize);
