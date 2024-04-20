fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => renderProducts(products));

const productSection = document.querySelector("#product_section");

function renderProducts(products) {
  products.forEach(product => renderProduct(product));
}

function renderProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.innerHTML = `
    <img src=${product.image} alt="idk">
    <p>${product.category}</p>
    <h2>${product.title}</h2>
    <p>${starRating(product.rating)}</p>
    <p>${product.price}</p>
  `
  productSection.append(productDiv);
}

//star rating for product cards

function starRating(rating) {
  let ratingStar = "";

  for (let i = 1; i <= rating; i++) {
    ratingStar += `<i class="fa-solid fa-star"></i>`
  }

  return ratingStar;
}