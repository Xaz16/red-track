import { IClock } from '../interfaces/IClock';
import { Timer } from './Timer';

export default class Clock extends Timer implements IClock {
  constructor(timerInstance: Timer) {
    super();
  }

  public start() {
    const time = new Date(new Date().getTime() - this.startTime);
    const hours = time.getHours() - 3 < 10 ? '0' + (time.getHours() - 3) : time.getHours() - 3;
    const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    this.changeDisplayedValue({hours: hours, minutes: minutes, seconds: seconds});
    requestAnimationFrame(this.start);
  }

  private changeDisplayedValue({time}) {
    document.querySelectorAll('.clock')[0].innerHTML = time.hours + ":" + time.minutes + ":" + time.seconds;
  }

}
