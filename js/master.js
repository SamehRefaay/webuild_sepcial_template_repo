// get page elements
var landingPage = document.querySelector(".landing-page");
// change landing page background image
console.log(landingPage);
const arrayOfImages = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
];

setInterval(() => {
  let randomNumber = Math.floor(Math.random() * arrayOfImages.length);
  landingPage.style.backgroundImage =
    "url(images/" + arrayOfImages[randomNumber] + ")";
}, 10000);
