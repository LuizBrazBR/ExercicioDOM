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
  progressBars: HTMLElement[];

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
    this.progressBars = [];
  }

  timeout(time: number) {
    if (this.paused) {
      this.paused = false;
      this.progressBars[this.index]?.classList.remove("paused");
      this.timeControl?.continue();
      if (this.slide instanceof HTMLVideoElement) {
        this.slide.play();
      }
    } else {
      this.timeControl?.clear();
      this.timeControl = new Timeout(() => this.next(), time);
    }
  }

  show(index: number) {
    if (this.paused) {
      this.timeout(this.time);
    } else {
      this.index = index;
      localStorage.setItem("index", String(this.index));
      this.slide = this.elements[this.index];
      this.hide();
      this.slide.classList.add("active");
      this.updateProgress();
      if (this.slide instanceof HTMLVideoElement) {
        this.autoVideo(this.slide);
      } else {
        this.timeout(this.time);
      }
    }
  }

  hide() {
    this.elements.forEach((n) => {
      n.classList.remove("active");
      if (n instanceof HTMLVideoElement) {
        n.pause();
        n.currentTime = 0;
      }
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
      this.progressBars[this.index]?.classList.add("paused");
      this.timeControl?.pause();
      this.paused = true;
      if (this.slide instanceof HTMLVideoElement) {
        this.slide.pause();
      }
    }, 300);
  }

  autoVideo(el: HTMLVideoElement) {
    el.muted = true;
    el.play();
    let firstPlay = true;
    el.addEventListener("playing", () => {
      if (firstPlay) this.timeout(el.duration * 1000);
      this.progressBars[this.index].style.animationDuration =
        String(el.duration) + "s";
      firstPlay = false;
    });
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

  addProgressBar() {
    const container = document.createElement("div");
    container.classList.add("progress-container");
    for (let index = 0; index < this.elements.length; index++) {
      const progress = document.createElement("div");
      const fill = document.createElement("div");
      this.container.appendChild(container);
      container.appendChild(progress);
      progress.appendChild(fill);
      progress.classList.add("progress");
      fill.classList.add("progress-fill");
      fill.style.animationDuration = String(this.time) + "ms";
      this.progressBars.push(fill);
    }
  }

  updateProgress() {
    this.progressBars.forEach((fill) => {
      fill.classList.remove("animate");
    });

    this.progressBars[this.index]?.classList.add("animate");
  }

  init() {
    const index = localStorage.getItem("index");
    this.addProgressBar();
    this.show(index ? +index : this.index);
    this.addControl();
  }
}
