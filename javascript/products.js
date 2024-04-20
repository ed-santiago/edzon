fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => renderProducts(products));

const productSection = document.querySelector("#product_section");

function renderProducts(products) {
  products.forEach(product => renderProduct(product));
}

function renderProduct(product) {
  productSection.innerHTML = `
    <figure>
      <img src="${product.image}" alt="idk">
    </figure>
  `
}