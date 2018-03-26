import { INavigation } from '../interfaces/INavigation';

export class NavigationController implements INavigation {
  public page: string;
  public elements: NodeListOf<Element>;
  public navigatableElementsClasses: string[];

  constructor(elements: NodeListOf<Element>, navigatableElementsClasses: string[]) {
    this.navigatableElementsClasses = navigatableElementsClasses;
    this.bindToElement(elements);
  }

  public getCurrentPage(): string {
    return this.page;
  }

  public resetPages(): void {
    const pages = Array.prototype.slice.call(document.querySelectorAll('[data-page]'));
    for (const page of pages) {
      page.removeAttribute('data-page-active');
    }
  }

  public changePage(name: string): void {
    this.page = name;
    document.getElementById(name).setAttribute('data-page-active', '');

    this.navigatableElementsClasses.map((item) => {
      const elements = Array.prototype.slice.call(document.getElementsByClassName(item));

      for (const element of elements) {
        element.classList.remove(`${item}--active`);

        if (element.querySelector(`[data-go-to="${name}"]`) !== null) {
          element.classList.add(`${item}--active`);
        }
      }
    });
  }

  public bindToElement(elements: NodeListOf<Element>): void {
    const elemArr = Array.prototype.slice.call(elements);
    this.elements = elemArr;
    for (const element of elemArr) {
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
}
