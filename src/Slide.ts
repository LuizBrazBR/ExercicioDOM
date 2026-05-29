export default class Slide {
  container: Element;
  elements: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
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
  }

  show(index: number) {
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
}
