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

let imgListIndex = 0;
const interval = setInterval(() => {
  imgList[imgListIndex].scrollIntoView();
  imgListIndex += 1;
  if (imgListIndex >= imgList.length) {
    imgListIndex = 0;
  }
}, 3000);