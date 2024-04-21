/* SEARCH BAR */

const searchForm = document.querySelector("#form_search");
const searchBar = document.querySelector("#search_value");
const formSort = document.querySelector("#form_sort");
let productsArray = [];
let copyOfProductsArray = [];

let sortFilteredProducts = [];

fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => {
    productsArray = products
    copyOfProductsArray = [...productsArray]
  });

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();
  const filteredProducts = copyOfProductsArray.filter(product => {
    return product.title.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
  })
  sortFilteredProducts = filteredProducts;
  renderProducts(filteredProducts);
  searchForm.reset();
  formSort.reset();
})

/* SORT PRODUCTS */

formSort.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "all":
      sortFilteredProducts = [];
      renderProducts(productsArray);
      break;
    case "lowest_price":
      renderProducts(lowestPrice());
      break;
    case "highest_price":
      renderProducts(highestPrice());
      break;
    case "sale":
      console.log("sale");
      break;
  }
})

function lowestPrice() {
  if (sortFilteredProducts.length === 0) {
    return productsArray.sort((a, b) => a.price - b.price)
  } else {
    return sortFilteredProducts.sort((a, b) => a.price - b.price)
  }
}

function highestPrice() {
  if (sortFilteredProducts.length === 0) {
    return productsArray.sort((a, b) => b.price - a.price)
  } else {
    return sortFilteredProducts.sort((a, b) => b.price - a.price)
  }
}