/* HERO SECTION */

const slider = document.querySelector("#slider");
const sliderDivs = [...document.querySelectorAll(".background_image")];
const sliderNavArray = [...document.querySelectorAll("#slider_nav div")];
const sortSection = document.querySelector("#sort_section");

let counter = 0;

function automateSlider() {
  if (counter === 2) {
    counter = 0;
    slider.scrollTo(0, 0);
  } else {
    counter += 1;
    slider.scrollBy(100, 0);
  }
  
  sliderNavArray.forEach((nav, index) => {
    counter === index ? nav.style.scale = "1.8" : nav.style.scale = "1";
  })
}

/* let intervalId = setInterval(automateSlider, 5000); */

sliderNavArray.forEach((nav, navIndex) => {
  nav.addEventListener("click", () => {
    counter = navIndex;
    nav.style.scale = "1.8";
    sliderDivs.find((div, divIndex) => divIndex === navIndex).scrollIntoView({block: 'center'});
    sliderNavArray.filter(otherNav => otherNav !== nav).forEach(otherNav => otherNav.style.scale = "1");
    clearInterval(intervalId);
    intervalId = setInterval(automateSlider, 5000);
  })
})

/* HERO SECTION BUTTONS */

//Clothes Sale
const slide1Button = document.querySelector("#slide_1 button");
slide1Button.addEventListener("click", () => {
  const clothesCategory = productsArray.filter(product => {
    return product.category === "Men's" ||
      product.category === "Women's"
  })
  filteredProducts = clothesCategory.filter(product => product.price.salePrice > 0);
  renderProducts(filteredProducts);
  sortSection.scrollIntoView();
  filterTitle.textContent = "Clothe's Sale"
})

//Jewellery Sale
const slide2Button = document.querySelector("#slide_2 button");
slide2Button.addEventListener("click", () => {
  const jewelleryCategory = productsArray.filter(product => product.category === "Jewellery");
  filteredProducts = jewelleryCategory.filter(product => product.price.salePrice > 0);
  renderProducts(filteredProducts)
  sortSection.scrollIntoView();
  filterTitle.textContent = "Jewellery Sale"
})

//New Monitor
const slide3Button = document.querySelector("#slide_3 button");
slide3Button.addEventListener("click", () => {
  openProductDialog(productsArray[13]);
})