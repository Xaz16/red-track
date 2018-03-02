export interface ITimer {
  startTime: number;
  start: () => void;
  pause: () => void;
  addTime: (amount: number) => number;
  getTime: () => number;
  destroy: () => void;
}
