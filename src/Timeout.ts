export default class Timeout {
  id;
  handler;
  pauseTime;
  startTime;
  time;
  constructor(handler: TimerHandler, time: number) {
    this.id = setTimeout(handler, time);
    this.handler = handler;
    this.pauseTime = 0;
    this.startTime = Date.now();
    this.time = time;
  }
  clear() {
    clearTimeout(this.id);
  }
  pause() {
    this.clear();
    const passaram = Date.now() - this.startTime;
    const restante =
      this.pauseTime === 0 ? this.time - passaram : this.pauseTime - passaram;
    this.pauseTime = restante;
  }
  continue() {
    this.startTime = Date.now();
    this.id = setTimeout(this.handler, this.pauseTime);
  }
}
