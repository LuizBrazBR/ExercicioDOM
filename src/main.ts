import "./style.css";
import Slide from "./Slide";
import imagem1 from "./assets/imagem_1.jpg";
import imagem2 from "./assets/imagem_2.jpg";
import imagem3 from "./assets/imagem_3.jpg";
import video from "./assets/video.mp4";

const app = document.querySelector<HTMLDivElement>("#app");
const container = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slides");
const controllers = document.querySelector(".controllers");

if (container && slides && controllers) {
  new Slide(container, Array.from(slides), controllers);
}

if (app) {
  app.innerHTML = `
  <div class="carousel">
    <div class="slides">
      <img src=${imagem1} class="active">
      <img src=${imagem2} >
      <img src=${imagem3} >
      <video src=${video} autoplay></video>
    </div>
    <div class="controllers">
      <button class="prev">←</button>
      <button class="next">→</button>
    </div>
  </div>
`;
}
