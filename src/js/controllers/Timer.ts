import { ITimer } from '../interfaces/ITimer';

export class Timer implements ITimer {
  private startTime: number;
  private dateInstance: Date = new Date();

  constructor() {
    this.startTime = this.dateInstance.getTime();
  }

  public get getStartTime() {
    return this.startTime;
  }

  public start() {
    const abc = '123';
  }

  public pause() {
    const abc = '123';
  }

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
