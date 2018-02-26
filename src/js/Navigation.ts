import { INavigation } from './interfaces/INavigation';

export class NavigationController implements INavigation {
  public page: string;
  public elements: NodeListOf<Element>;

  constructor(elements: NodeListOf<Element>) {
    this.bindToElement(elements);
  }

  public getCurrentPage(): string {
    return this.page;
  }

  public resetPages(): void {
    const pages = document.querySelectorAll('[data-page]');
    const pagesElems =  Array.prototype.slice.call(pages);
    for (const page of pagesElems) {
      page.removeAttribute('data-page-active');
    }
  }

  public changePage(name: string): void {
    this.page = name;
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
  }
}
