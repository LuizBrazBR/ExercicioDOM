import Slide from "./Slide";

export default function slideClass(): void {
  const container = document.querySelector(".carousel");
  const slides = document.querySelector(".slides");
  const controllers = document.querySelector(".controllers");
  if (container && slides && controllers) {
    new Slide(container, Array.from(slides.children), controllers);
  }
}
