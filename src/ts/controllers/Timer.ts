import {ITimer} from '../interfaces/ITimer';
import {Time} from '../typings/Time';

export class Timer implements ITimer {
  public isStopped: boolean;
  public id: number;
  public $root: HTMLElement;
  private startTime: number;
  private stoppedTimes: number[];
  private dateInstance: Date = new Date();

  constructor($root: HTMLElement) {
    this.$root = $root;
    this.startTime = this.dateInstance.getTime();
    this.id = Math.random() * 1000;
  }

  public get getStartTime() {
    return this.startTime;
  }

  public get getDateInstance() {
    return this.dateInstance;
  }

  public start() {
    const time = new Date(this.getTime());
    const hours = time.getHours() - 3 < 10 ? '0' + (time.getHours() - 3) : time.getHours() - 3;
    const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    if (!this.isStopped) {
      this.changeDisplayedValue({hours, minutes, seconds});
      requestAnimationFrame(this.start);
    }
  }

  public changeDisplayedValue(time: Time) {
    this.$root.querySelectorAll('.clock')[0].innerHTML = time.hours + ":" + time.minutes + ":" + time.seconds;
  }

  public pause() {
    this.isStopped = true;
    this.stoppedTimes.push(this.getStartTime);
  }

  public getTime() {
    return this.dateInstance.getTime() - this.startTime;
  }

  public addTime(amount: number): number {
    this.startTime -= amount;
    return this.getTime();
  }

  public destroy() {
    return this.pause();
  }

}
