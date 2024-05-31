/* NAVBAR */
const filterTitle = document.querySelector("#sort_section h1");
const hamMenu = document.querySelector(".ham_menu");

let productsArray = [];
let filteredProducts = [];

fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => productsArray = products);

//Show all products
const allNav = document.querySelectorAll(".nav_all");
allNav.forEach(nav => {
  nav.addEventListener("click", () => {
    filterTitle.textContent = "All";
    filteredProducts = [];
    renderProducts(productsArray);
    hamMenu.style.right = "-100vw";
  })
})

//Mens filter
const menNav = document.querySelectorAll(".nav_men");
menNav.forEach(nav => {
  nav.addEventListener("click", () => {
    productsFilter("Men's");
  })
})

//Womens filter
const womenNav = document.querySelectorAll(".nav_women");
womenNav.forEach(nav => {
  nav.addEventListener("click", () => {
    productsFilter("Women's");
  })
})

//Jewellery filter
const jewelleryNav = document.querySelectorAll(".nav_jewellery");
jewelleryNav.forEach(nav => {
  nav.addEventListener("click", () => {
    productsFilter("Jewellery");
  })
})

//Electronic filter
const electronicNav = document.querySelectorAll(".nav_electronics");
electronicNav.forEach(nav => {
  nav.addEventListener("click", () => {
    productsFilter("Electronics");
  })
})

//FILTER PRODUCT BY CATEGORY
function productsFilter(category) {
  hamMenu.style.right = "-100vw";
  filterTitle.textContent = category;
  filteredProducts = productsArray.filter(product => {
    return product.category === category;
  })
  renderProducts(filteredProducts);
  formSort.reset();
}

/* HAMBUGER MENU */

const hamIcon = document.querySelector("#ham_icon");
const hamMenuCloseButton = document.querySelector(".fa-xmark");

hamIcon.addEventListener("click", () => {
  hamMenu.style.right = "0";
})

hamMenuCloseButton.addEventListener("click", () => {
  hamMenu.style.right = "-200vw";
})