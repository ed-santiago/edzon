const productSection = document.querySelector("#product_section");
const productDialog = document.querySelector("#product_dialog");
const productInfo = document.querySelector(".product_info");

/* LOADER */
const loader = `<div id="loader_container">
  <h1>Loading products</h1>
  <div id="loader"></div>
</div>`

productSection.innerHTML = loader;

/* fetch("https://edzon-db.onrender.com/products")
  .then(res => res.json())
  .then(products => renderProducts(products)); */

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
    <div class=cardPriceCart>
      <div class="cardPriceRating">
        ${starRating(product.rating)}
        <div class="cardPrice">
          ${displayPrice(product)}
        </div>
      </div>
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
  `
  productSection.append(productDiv);
  const cardImage = productDiv.querySelector("img");
  cardImage.addEventListener("click", () => openProductDialog(product));

  //Add to cart
  const cardCart = productDiv.querySelector(".fa-cart-shopping");
  cardCart.addEventListener("click", () => addToCart(product));
}

//Star rating for product cards
function starRating(rating) {
  let ratingStar = "";

  for (let i = 1; i <= rating; i++) {
    ratingStar += `<i class="fa-solid fa-star"></i>`
  }

  return ratingStar;
}

//Display price
function displayPrice(product) {
  const price = product.price;

  if (price.salePrice > 0) {
    return `
      <p><del>$${price.originalPrice}</del></p>
      <p class="salePrice">$${price.salePrice}</p>
    `
  } else {
    return `<p>$${price.originalPrice}</p>`
  }
}

//Open product info dialog
function openProductDialog(product) {
  productDialog.showModal();
  productInfo.innerHTML = `
    <figure>
      <img src="${product.image}" alt="${product.title}">
    </figure>
    <div class="info">
      <div class="infoTitle">
        <h1>${product.title}</h1>
        <i class="fa-solid fa-xmark"></i>
      </div>
      <hr>
      <div class="infoPriceRating">
        <div class="infoPrice">
          ${displayPrice(product)}
        </div>
        <div class="infoRating">
          ${starRating(product.rating)}
        </div>
      </div>
      <h2>Description</h2>
      <p class=infoDescription>${product.description}</p>
      <button class=infoButton>Add To Cart</button>
    </div>
  `
  const infoXButton = document.querySelector(".infoTitle .fa-xmark");
  infoXButton.addEventListener("click", () => {
    productDialog.close();
  })
}