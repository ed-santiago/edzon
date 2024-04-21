/* NAVBAR */
let productsArray = [];
let copyOfProductsArray = [];

fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => {
    productsArray = products
    copyOfProductsArray = [...productsArray]
  });

  /* FILTER PRODUCT BY CATEGORY */
  function productsFilter(title, category) {
    productSectionH1.textContent = title
    productSection.innerHTML = ''
    fetch(productAPI)
      .then(res => res.json())
      .then(products => {
        products.forEach(product => {
          if (product.category === category) {
            renderProduct(product)
          }
        })
      })
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