export interface INavigation {
  changePage: (name: string) => void;
  getCurrentPage: () => string;
  goToPage: (name: string) => void;
  bindToElement: () => void;
  page: string;
}
