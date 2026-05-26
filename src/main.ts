import "./style.css";
import Slide from "./Slide";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `


  <div class="carousel">
    <div class="slides">
      <img src="./assets/imagem_1.jpg" >
      <img src="./assets/imagem_2.jpg" >
      <img src="./assets/imagem_3.jpg" >
    </div>
    <div class="controllers">
      <button class="prev">←</button>
      <button class="next">→</button>
    </div>
  </div>
`;
}
