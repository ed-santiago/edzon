/* NAVBAR */
let productsForNav = [];
const filterTitle = document.querySelector("#sort_section h1");

fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => productsForNav = products);

//Show all products
const allNav = document.querySelector(".nav_all");
allNav.addEventListener("click", () => {
  renderProducts(productsForNav);
})

//Mens filter
const menNav = document.querySelector(".nav_men");
menNav.addEventListener("click", () => {
  productsFilter("Men's clothing");
})

//Womens filter
const womenNav = document.querySelector(".nav_women");
womenNav.addEventListener("click", () => {
  productsFilter("Women's clothing");
})

//Jewellery filter
const jewelleryNav = document.querySelector(".nav_jewellery");
jewelleryNav.addEventListener("click", () => {
  productsFilter("Jewellery");
})

const electronicNav = document.querySelector(".nav_electronics");
electronicNav.addEventListener("click", () => {
  productsFilter("Electronics");
})

/* FILTER PRODUCT BY CATEGORY */
function productsFilter(category) {
  filterTitle.textContent = category;
  const categoryFilter = [...productsForNav].filter(product => {
    return product.category === category;
  })
  renderProducts(categoryFilter);
}

/* HAMBUGER MENU */

const hamIcon = document.querySelector("#ham_icon");
const hamMenuCloseButtont = document.querySelector(".fa-xmark");
const hamMenu = document.querySelector(".ham_menu");

hamIcon.addEventListener("click", () => {
  hamMenu.style.right = "0";
})

hamMenuCloseButtont.addEventListener("click", () => {
  hamMenu.style.right = "-100vw";
})