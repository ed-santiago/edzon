/* HERO SECTION */

const slider = document.querySelector("#slider");
const sliderNavList = document.querySelectorAll("#slider_nav a");
const sliderNavArray = Array.from(sliderNavList)

let counter = 0;
const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

function automateSlider() {
  increaseCounter();
  slider.scrollBy(100, 0);
  if (counter === 2) {
    slider.scrollTo(0, 0);
  }

  sliderNavArray.forEach((nav, index) => {
    counter === index ? nav.style.scale = "1.8" : nav.style.scale = "1";
    nav.addEventListener("click", () => {
      counter = index;
      nav.style.scale = "1.8";
      sliderNavArray.filter(otherNav => otherNav !== nav).forEach(otherNav => otherNav.style.scale = "1");
      increaseCounter();
    })
  })
}

function increaseCounter() {
  counter += 1;
  if (counter >= sliderNavArray.length) {
    counter = 0;
  }
}

const intervalId = setInterval(automateSlider, 2000);