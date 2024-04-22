/* SEARCH BAR */

const searchForm = document.querySelector("#form_search");
const searchBar = document.querySelector("#search_value");
const formSort = document.querySelector("#form_sort");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();
  filteredProducts = productsArray.filter(product => {
    return product.title.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
  })
  renderProducts(filteredProducts);
  searchForm.reset();
  formSort.reset();
})

/* SORT PRODUCTS */

formSort.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "all":
      filteredProducts = [];
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
  if (filteredProducts.length === 0) {
    return [...productsArray].sort((a, b) => a.price - b.price)
  } else {
    return filteredProducts.sort((a, b) => a.price - b.price)
  }
}

function highestPrice() {
  if (filteredProducts.length === 0) {
    return [...productsArray].sort((a, b) => b.price - a.price)
  } else {
    return filteredProducts.sort((a, b) => b.price - a.price)
  }
}