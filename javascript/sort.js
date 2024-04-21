/* SEARCH BAR */

const searchForm = document.querySelector("#form_search");
const searchBar = document.querySelector("#search_value");
const formSort = document.querySelector("#form_sort");
let productsArray = [];
let sortFilteredProducts = [];

fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => productsArray = products);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();
  const filteredProducts = productsArray.filter(product => {
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
      renderProducts(productsArray);
      break;
    case "low_to_high":
      renderProducts(lowToHigh());
      break;
    case "high_to_low":
      renderProducts(highToLow());
      break;
    case "sale":
      console.log("sale");
      break;
  }
})

function lowToHigh() {
  if (sortFilteredProducts.length === 0) {
    return productsArray.sort((a, b) => a.price - b.price)
  } else {
    return sortFilteredProducts.sort((a, b) => a.price - b.price)
  }
}

function highToLow() {
  if (sortFilteredProducts.length === 0) {
    return productsArray.sort((a, b) => b.price - a.price)
  } else {
    return sortFilteredProducts.sort((a, b) => b.price - a.price)
  }
}

/* return products.sort((a, b) => {
  return a.price - b.price;
}) */
/* console.log(e.target.value) */