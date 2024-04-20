fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => renderProducts(products));

const productSection = document.querySelector("#product_section");

function renderProducts(products) {
  products.forEach(product => renderProduct(product));
}

function renderProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.id = "product_card";
  productDiv.innerHTML = `
    <img src=${product.image} alt="idk">
    <p class="category">${product.category}</p>
    <h2>${product.title}</h2>
    <div id=starPriceCart>
      <div id="star_and_price">
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