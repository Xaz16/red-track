import { IMenu } from "./interfaces/menuInterface";

class MenuController implements IMenu {
  constructor(page: string, elements: object, parent: HTMLElement) {
    this.page = page;
    this.changePage(this.page);
    this.bindToElement(parent, elements);
  }
  public getCurrentPage(): string {
    return this.page;
  }
  public changePage(name: string): void {
    this.page = name;
  }
  public bindToElement(parent: object, elements: object): void {
    this.elements = elements;
    this.parent = parent;
  }
}
