/* SEARCH BAR */

const productSection = document.querySelector("#product_section");
const searchForm = document.querySelector("#form_search");
const searchBar = document.querySelector("#search_value");
const formSort = document.querySelector("#form_sort");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();
  filteredProducts = productsArray.filter(product => {
    return product.title.toLowerCase().startsWith(searchValue) ||
      product.category.toLowerCase().startsWith(searchValue)
  })
  renderProducts(filteredProducts);
  filterTitle.textContent = searchValue;
  if (filteredProducts.length === 0) {
    productSection.innerHTML = `
      <h2>There are no results that match your search.</h2>
    `
  }
  searchForm.reset();
  formSort.reset();
})

/* SORT PRODUCTS */

formSort.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "all":
      filteredProducts = [];
      renderProducts(productsArray);
      filterTitle.textContent = "All";
      break;
    case "lowest_price":
      renderProducts(lowestPrice());
      break;
    case "highest_price":
      renderProducts(highestPrice());
      break;
    case "sale":
      renderProducts(displaySale());
      break;
  }
})

function lowestPrice() {
  if (filteredProducts.length === 0) {
    return [...productsArray].sort((a, b) => sortPrice(a, b));
  } else {
    return filteredProducts.sort((a, b) => sortPrice(a, b));
  }
}

function highestPrice() {
  if (filteredProducts.length === 0) {
    return [...productsArray].sort((a, b) => sortPrice(b, a));
  } else {
    return filteredProducts.sort((a, b) => sortPrice(b, a));
  }
}

function displaySale() {
  if (filteredProducts.length === 0) {
    return productsArray.filter(product => product.price.salePrice > 0)
  } else {
    return filteredProducts.filter(product => product.price.salePrice > 0)
  }
}

function sortPrice(a, b) {
  if (a.price.salePrice > 0 && b.price.salePrice > 0)
    return a.price.salePrice - b.price.salePrice
  else if (a.price.salePrice > 0)
    return a.price.salePrice - b.price.originalPrice
  else if (b.price.salePrice > 0)
    return a.price.originalPrice - b.price.salePrice
  else
    return a.price.originalPrice - b.price.originalPrice
}