import { ITimer } from './ITimer';

export interface IClock extends ITimer {
  timerInstance: ITimer;
  addTimerTemplate: () => number;
  changeDisplayedValue: () => void;
  clear: () => void;
  start: () => void;
}
