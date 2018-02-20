export interface IMenu {
  changePage: (name: string) => void;
  getCurrentPage: () => string;
  goToPage: (name: string) => void;
  bindToElement: (parent: object, elements: object) => void;
  page: string;
  parent: HTMLElement;
}
