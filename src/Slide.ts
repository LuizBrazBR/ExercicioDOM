import Timeout from "./Timeout";

export default class Slide {
  container: Element;
  elements: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
  timeControl: Timeout | null;
  paused: boolean;
  leftTime: number;

  constructor(
    container: Element,
    elements: Element[],
    controls: Element,
    time: number = 1000,
  ) {
    this.container = container;
    this.elements = elements;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.elements[this.index];
    this.timeControl = null;
    this.paused = false;
    this.leftTime = 0;
  }

  timeout() {
    this.timeControl?.clear();
    this.timeControl = new Timeout(() => this.next(), this.time);
  }

  show(index: number) {
    this.timeout();
    this.hide();
    this.index = index;
    this.slide = this.elements[this.index];
    this.slide.classList.add("active");
    this.leftTime = Date.now();
  }

  hide() {
    this.elements.forEach((n) => {
      n.classList.remove("active");
    });
  }

  next() {
    if (this.paused) return;
    const total = this.elements.length;
    this.show(this.index + 1 < total ? this.index + 1 : 0);
  }

  prev() {
    if (this.paused) return;
    const total = this.elements.length;
    this.show(this.index - 1 >= 0 ? this.index - 1 : total - 1);
  }

  pause() {
    new Timeout(() => this.timeControl?.clear(), 800);
    this.paused = true;
    this.leftTime = Date.now() - this.leftTime;
    console.log(this.leftTime);
  }

  addControl() {
    const next = document.createElement("button");
    const prev = document.createElement("button");
    next.innerHTML = ">";
    prev.innerHTML = "<";
    this.controls.appendChild(prev);
    this.controls.appendChild(next);
    next.addEventListener("pointerup", () => this.next());
    prev.addEventListener("pointerup", () => this.prev());
    prev.addEventListener("pointerdown", () => this.pause());
    next.addEventListener("pointerdown", () => this.pause());
  }

  init() {
    this.show(this.index);
    this.addControl();
  }
}
