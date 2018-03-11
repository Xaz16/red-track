import { ITimer } from '../interfaces/ITimer';

export class Timer implements ITimer {
  protected startTime: number;
  private dateInstance: Date = new Date();

  constructor() {
    this.startTime = this.dateInstance.getTime();
  }

  public get getStartTime() {
    return this.startTime;
  }

  public start() {}

  public pause() {}

  public getTime() {
    return this.startTime - this.dateInstance.getTime();
  }

  public addTime(amount: number): number {
    this.startTime -= amount;
    return this.getTime();
  }

  public destroy() {
    return this.pause();
  }

}
