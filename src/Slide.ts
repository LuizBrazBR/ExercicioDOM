import Timeout from "./Timeout";



export default class Slide {
  container: Element;
  elements: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
  timeControl: Timeout

  constructor(
    container: Element,
    elements: Element[],
    controls: Element,
    time: number = 5000,
  ) {
    this.container = container;
    this.elements = elements;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.elements[this.index];
    this.timeControl = new Timeout(this.next.bind(this), this.time)
  }

  show(index: number) {
    this.timeControl.clear()
    this.timeControl = new Timeout(this.next.bind(this), this.time)
    this.hide();
    this.index = index;
    this.slide = this.elements[this.index];
    this.slide.classList.add("active");
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

  addControl() {
    const next = document.createElement("button");
    const prev = document.createElement("button");
    next.innerHTML = ">";
    prev.innerHTML = "<";
    this.controls.appendChild(prev);
    this.controls.appendChild(next);
    next.addEventListener("pointerup", () => this.next());
    prev.addEventListener("pointerup", () => this.prev());
  }

  init() {
    this.show(this.index);
    this.addControl();
  }
}
