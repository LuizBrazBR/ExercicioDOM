import "./style.css";
import Slide from "./Slide";
import imagem1 from "./assets/imagem_1.jpg"
import imagem2 from "./assets/imagem_2.jpg"
import imagem3 from "./assets/imagem_3.jpg"
import video from "./assets/video.mp4"


const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
  <div class="carousel">
    <div class="slides">
      <img src=${imagem1} >
      <img src=${imagem2} >
      <img src=${imagem3} >
      <video src=${video} autoplay  controls></video>
    </div>
    <div class="controllers">
      <button class="prev">←</button>
      <button class="next">→</button>
    </div>
  </div>
`;
}
