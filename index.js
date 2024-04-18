/* HEADER NAVBAR */

const hamIcon = document.querySelector("#ham_icon");
const hamMenuCloseButtont = document.querySelector(".fa-xmark");
const hamMenu = document.querySelector(".ham_menu");

hamIcon.addEventListener("click", () => {
  hamMenu.style.right = "0";
})

hamMenuCloseButtont.addEventListener("click", () => {
  hamMenu.style.right = "-100vw";
})

/* HERO SECTION */

const imgList = document.querySelectorAll("#slider img");
const sliderNavList = document.querySelectorAll("#slider_nav a");
const sliderNavArray = Array.from(sliderNavList)

function changeSliderNavScale() {
  sliderNavArray.forEach((nav, index) => {
    imgListIndex === index ? nav.style.scale = "1.8" : nav.style.scale = "1";
  })
}

let imgListIndex = 0;
const interval = setInterval(() => {
  imgList[imgListIndex].scrollIntoView();
  changeSliderNavScale();
  imgListIndex += 1;
  if (imgListIndex >= imgList.length) {
    imgListIndex = 0;
  }
}, 5000);

sliderNavArray.forEach((nav) => {
  nav.addEventListener("click", () => {
    nav.style.scale = "1.8";
    sliderNavArray.filter(otherNav => otherNav !== nav).forEach(otherNav => otherNav.style.scale = "1");
  })
})