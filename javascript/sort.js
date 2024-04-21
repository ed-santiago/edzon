/* SEARCH BAR */

const searchForm = document.querySelector("#form_search");
const searchBar = document.querySelector("#search_value");
let productArray = [];

fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => productArray = products);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchBar.value.toLowerCase();
  const filteredProducts = productArray.filter(product => {
    return product.title.toLowerCase().includes(searchValue) ||
    product.category.toLowerCase().includes(searchValue)
  })
  renderProducts(filteredProducts);
})

/* SORT PRODUCTS */

const productSectionChildren = document.querySelector("#product_section").children;
/* setTimeout(() => {
  productArray = [...productSectionChildren]
}, 1000) */

const formSort = document.querySelector("#form_sort");

formSort.addEventListener("change", () => {
  console.log(idk)
})

/* fetch("https://edzon-db.onrender.com/products")
    .then(res => res.json())
    .then(products => sortProducts(products));

function sortProducts(products) {
  formSort.addEventListener("change", (e) => {
    productSection.innerHTML = "";
    switch (e.target.value) {
      case "all":
        renderProducts(products);
        break;
      case "low_to_high":
        renderProducts(lowToHigh(products));
        break;
      case "high_to_low":
        renderProducts(highToLow(products));
        break;
      case "sale":
        console.log("sale");
        break;
    }
  })
}

function lowToHigh(products) {
  return products.sort((a, b) => {
    return a.price - b.price;
  })
}

function highToLow(products) {
  return products.sort((a, b) => {
    return b.price - a.price;
  })
} */

/* return products.sort((a, b) => {
  return a.price - b.price;
}) */
/* console.log(e.target.value) */