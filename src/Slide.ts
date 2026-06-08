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
    time: number = 2000,
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
    if (this.paused) {
      this.paused = false;
      this.timeControl?.clear();
      this.timeControl = new Timeout(() => this.next(), this.leftTime);
    } else {
      this.timeControl?.clear();
      this.timeControl = new Timeout(() => this.next(), this.time);
    }
  }

  show(index: number) {
    if (this.paused) {
      this.timeout();
    } else {
      this.leftTime = Date.now();
      this.index = index;
      this.slide = this.elements[this.index];
      this.hide();
      this.slide.classList.add("active");
      this.timeout();
    }
  }

  hide() {
    this.elements.forEach((n) => {
      n.classList.remove("active");
    });
  }

  next() {
    const total = this.elements.length;
    this.show(this.index + 1 < total ? this.index + 1 : 0);
  }

  prev() {
    const total = this.elements.length;
    this.show(this.index - 1 >= 0 ? this.index - 1 : total - 1);
  }

  pause() {
    new Timeout(() => {
      this.timeControl?.clear();
      this.paused = true;
      const passaram = Date.now() - this.leftTime;
      const restante = this.time - passaram;
      this.leftTime = restante;
    }, 300);
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
