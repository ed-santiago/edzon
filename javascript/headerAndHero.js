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

const divList = document.querySelectorAll(".background_image");
const sliderNavList = document.querySelectorAll("#slider_nav a");
const sliderNavArray = Array.from(sliderNavList)

let divIndex = 0;
const interval = setInterval(() => {
  divList[divIndex].scrollIntoView();
  sliderNavArray.forEach((nav, index) => {
    divIndex === index ? nav.style.scale = "1.8" : nav.style.scale = "1";
  })
  divIndex += 1;
  if (divIndex >= divList.length) {
    divIndex = 0;
  }
}, 6000);

sliderNavArray.forEach((nav) => {
  nav.addEventListener("click", () => {
    nav.style.scale = "1.8";
    sliderNavArray.filter(otherNav => otherNav !== nav).forEach(otherNav => otherNav.style.scale = "1");
  })
})