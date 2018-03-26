export interface ITimer {
  start: () => void;
  pause: () => void;
  addTime: (amount: number) => number;
  getTime: () => number;
  destroy: () => void;
}
