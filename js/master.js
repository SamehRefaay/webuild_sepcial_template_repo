// get page elements
var landingPage = document.querySelector(".landing-page");
const settingsBox = document.querySelector(".settings-box");
const toggleSettings = document.querySelector(".toggle-settings");
const randomBgOptions = document.querySelectorAll(".random-bg span");
const colorsOptions = document.querySelectorAll(".colors li");
const header = document.querySelector(".header");
const topBar = document.querySelector(".top-bar");

//intersection observer
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
};
let observer = new IntersectionObserver(callback, options);
observer.observe(topBar);

// change landing page background image
const arrayOfImages = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
];
var changingBgIntervalId;

// check if there's color option in the local storage
if (localStorage.getItem("color-option") != null) {
  document.documentElement.style.setProperty(
    "--primary-color",
    localStorage.getItem("color-option")
  );
  colorsOptions.forEach((colorOption) => {
    if (colorOption.dataset.color === localStorage.getItem("color-option")) {
      colorOption.classList.add("active");
    } else {
      colorOption.classList.remove("active");
    }
  });
}
// check if there's color option in the local storage
if (
  localStorage.getItem("random-background") == null ||
  localStorage.getItem("random-background") === "yes"
) {
  changingBgIntervalId = setInterval(changeBackgroundImage, 10000);
} else {
  randomBgOptions.forEach((option) => {
    if (
      option.dataset.background === localStorage.getItem("random-background")
    ) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }
    clearInterval(changingBgIntervalId);
  });
}
// change main color for the website
colorsOptions.forEach((colorOption) => {
  //add click event to all lis
  colorOption.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--primary-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      //remove active class from all lis
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

function changeBackgroundImage() {
  let randomNumber = Math.floor(Math.random() * arrayOfImages.length);
  landingPage.style.backgroundImage =
    "url(images/" + arrayOfImages[randomNumber] + ")";
}
//show settings box
function showSettingsBox() {
  console.log("clicked");
  settingsBox.classList.toggle("open");
}
toggleSettings.addEventListener("click", showSettingsBox);

//random background options
randomBgOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    //remove active class from all spans
    randomBgOptions.forEach((ele) => {
      ele.classList.remove("active");
    });
    //add active class to clicked span
    e.target.classList.add("active");
    //store data in local storage
    localStorage.setItem("random-background", e.target.dataset.background);
    //if user click no we will stop interval and not changing background image
    if (e.target.dataset.background === "no") {
      clearInterval(changingBgIntervalId);
    } else {
      // if user click yes we will generate interval and change background
      changingBgIntervalId = setInterval(changeBackgroundImage, 10000);
    }
  });
});

//***************** lazy loading Images using inetsecting observer */
const aboutImages = document.querySelectorAll(".about img");
const imgOptions = {
  rootMargin: "0px 0px 200px 0px",
  threshold: 0,
};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      console.log("intersected now");
      const img = entry.target;
      const imageWidth = img.dataset.width;
      console.log(imageWidth);
      img.src = img.src.replace("&w=10", "&w=" + imageWidth);
      imgObserver.unobserve(img);
    }
  });
}, imgOptions);
aboutImages.forEach((image) => {
  imgObserver.observe(image);
});
//
