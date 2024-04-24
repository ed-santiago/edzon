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

/* const intervalId = setInterval(automateSlider, 2000); */

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
})

//Jewellery Sale
const slide2Button = document.querySelector("#slide_2 button");
slide2Button.addEventListener("click", () => {
  const jewelleryCategory = productsArray.filter(product => product.category === "Jewellery");
  filteredProducts = jewelleryCategory.filter(product => product.price.salePrice > 0);
  renderProducts(filteredProducts)
})