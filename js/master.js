// get page elements
var landingPage = document.querySelector(".landing-page");
const settingsBox = document.querySelector(".settings-box");
const toggleSettings = document.querySelector(".toggle-settings");
const colorsOptions = document.querySelectorAll(".colors li");

// change landing page background image
console.log(colorsOptions);
const arrayOfImages = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
];

// change main color for the website
colorsOptions.forEach((colorOption) => {
  colorOption.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--primary-color",
      e.target.dataset.color
    );
  });
});

setInterval(() => {
  let randomNumber = Math.floor(Math.random() * arrayOfImages.length);
  landingPage.style.backgroundImage =
    "url(images/" + arrayOfImages[randomNumber] + ")";
}, 10000);
//show settings box
function showSettingsBox() {
  console.log("clicked");
  settingsBox.classList.toggle("open");
}
toggleSettings.addEventListener("click", showSettingsBox);
