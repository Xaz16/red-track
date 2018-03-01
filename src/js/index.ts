import { NavigationController } from './Navigation';

document.addEventListener('DOMContentLoaded', () => {
  const Menu = new NavigationController(document.querySelectorAll('[data-go-to]'), ['options__item', 'menu__item']);
});
