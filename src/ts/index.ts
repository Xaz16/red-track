import {addParentsMethod} from '../js/parents';
import {AuthGuard} from "./controllers/AuthGuard";
import {NavigationController} from './controllers/Navigation';

const authForm = {
  inputs: [document.getElementsByName('url'), document.getElementsByName('api_key')],
};

document.addEventListener('DOMContentLoaded', () => {
  const navigation = new NavigationController(
    document.querySelectorAll('[data-go-to]'), ['options__item', 'menu__item']);
  const authGuard = new AuthGuard(navigation);
  authForm.inputs.map((item) => {
    const elm = item[0];
    authGuard.validateInput(elm, 10);
  });

  authGuard.checkPermissions();
});

addParentsMethod();
