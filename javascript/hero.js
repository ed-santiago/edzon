/* HERO SECTION */

const slider = document.querySelector("#slider");
const sliderNavList = document.querySelectorAll("#slider_nav a");
const sliderNavArray = Array.from(sliderNavList)

let counter = 1;
const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

function automateSlider() {
  slider.scrollBy(100, 0);
  if (slider.scrollLeft === maxScrollLeft) {
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
  increaseCounter();
}

function increaseCounter() {
  counter += 1;
  if (counter >= sliderNavArray.length) {
    counter = 0;
  }
}

const intervalId = setInterval(automateSlider, 5000);