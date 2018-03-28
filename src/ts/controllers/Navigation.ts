import {INavigation} from '../interfaces/INavigation';

export class NavigationController implements INavigation {
  private static instance: NavigationController;
  public page: string;
  public pages: HTMLElement[];
  public elements: HTMLElement[];
  public navigatableElementsClasses: string[];

  constructor(elements: NodeListOf<Element>, navigatableElementsClasses: string[]) {
    this.navigatableElementsClasses = navigatableElementsClasses;
    this.elements = Array.prototype.slice.call(elements);
    this.pages = Array.prototype.slice.call(document.querySelectorAll('[data-page]'));
    this.bindToElement();
  }

  public getCurrentPage(): string {
    return this.page;
  }

  public resetPages(): void {
    for (const page of this.pages) {
      page.removeAttribute('data-page-active');
    }
  }

  public changePage(name: string): void {
    this.page = name;
    document.getElementById(name).setAttribute('data-page-active', '');

    this.navigatableElementsClasses.map((item) => {
      for (const element of this.elements) {
        element.classList.remove(`${item}--active`);

        if (element.querySelector(`[data-go-to="${name}"]`) !== null) {
          element.classList.add(`${item}--active`);
        }
      }
    });
  }

  public bindToElement(): void {
    for (const element of this.elements) {
      element.addEventListener('click', () => {
        const name = element.dataset.goTo;
        this.goToPage(name);
      });
    }
  }

  public goToPage(name: string): void {
    this.resetPages();
    this.changePage(name);
  }

  public blockNavigation() {
    this.unbindNavigation();
  }

  public allowNavigation() {
    this.bindToElement();
  }

  private unbindNavigation() {
    for (const element of this.elements) {
      element.removeEventListener('click', () => {
        const name = element.dataset.goTo;
        this.goToPage(name);
      });
    }
  }
}
