const productSection = document.querySelector("#product_section");

fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => renderProducts(products));

function renderProducts(products) {
  productSection.innerHTML = "";
  products.forEach(product => renderProduct(product));
}

function renderProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product_card");
  productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <p class="category">${product.category}</p>
    <h2>${product.title}</h2>
    <div class=starPriceCart>
      <div class="star_and_price">
        ${starRating(product.rating)}
        <p class="price">$${product.price}</p>
      </div>
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
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