import { IClock } from '../interfaces/IClock';
import { Timer } from './Timer';

export default class Clock extends Timer implements IClock {
  private timerInstance: Timer;

  constructor(timerInstance: Timer) {
    this.timerInstance = timerInstance;
  }

}
