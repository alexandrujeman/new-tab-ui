// Random background image from ./img
const body = document.querySelector("body");
const totalImages = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./img/${imgNumber + 1}.jpg`;
  image.classList.add("background-image");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * totalImages);
  return number;
}

function bgInit() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

bgInit();
