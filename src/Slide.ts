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
  pressTimeout: Timeout | null = null;

  constructor(
    container: Element,
    elements: Element[],
    controls: Element,
    time: number = 3000,
  ) {
    this.container = container;
    this.elements = elements;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.elements[this.index];
    this.timeControl = null;
    this.paused = false;
    this.pressTimeout = null;
  }

  timeout() {
    if (this.paused) {
      this.paused = false;
      this.timeControl?.continue();
    } else {
      this.timeControl?.clear();
      this.timeControl = new Timeout(() => this.next(), this.time);
    }
  }

  show(index: number) {
    if (this.paused) {
      this.timeout();
    } else {
      this.index = index;
      this.slide = this.elements[this.index];
      this.hide();
      this.slide.classList.add("active");
      if (this.slide instanceof HTMLVideoElement) {
        this.autoVideo(this.slide);
      }
      this.timeout();
    }
  }

  hide() {
    this.elements.forEach((n) => {
      n.classList.remove("active");
    });
  }

  next() {
    this.pressTimeout?.clear();
    const total = this.elements.length;
    this.show(this.index + 1 < total ? this.index + 1 : 0);
  }

  prev() {
    this.pressTimeout?.clear();
    const total = this.elements.length;
    this.show(this.index - 1 >= 0 ? this.index - 1 : total - 1);
  }

  pause() {
    this.pressTimeout = new Timeout(() => {
      this.timeControl?.pause();
      this.paused = true;
    }, 300);
  }

  autoVideo(el: HTMLVideoElement) {
    el.muted = true;
    el.play();
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
