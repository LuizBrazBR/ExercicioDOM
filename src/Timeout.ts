export default class Timeout {
  id;
  handler;
  time;
  constructor(handler: TimerHandler, time: number) {
    this.handler = handler;
    this.time = time;
    this.id = setTimeout(handler, time);
  }
  clear() {
    clearTimeout(this.id);
  }
}
