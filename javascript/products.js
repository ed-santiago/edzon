const productDialog = document.querySelector("#product_dialog");
const productInfo = document.querySelector(".product_info");

let cartArray = [];
const cartTextContent = document.querySelector("#header_icons .fa-cart-shopping p");
const total = document.querySelector("#total");
const cartProductsSection = document.querySelector("#cart_products");

/* LOADER */
const loader = `
  <p id="loader_message">Please allow around 30 seconds or so for products to load as I am using the free version of Render.</p>
  <div id="loader_container">
    <h1>Loading products</h1>
    <div id="loader"></div>
  </div>
`

productSection.innerHTML = loader;

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
    <div class="category_rating">
      <p class="category">${product.category}</p>
      <div class="cardPriceRating">
        ${starRating(product.rating)}
      </div>
    </div>
    <h2>${product.title}</h2>
    <div class=cardPriceCart>
      <div class="cardPrice">
        ${displayPrice(product)}
      </div>
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
  `
  productSection.append(productDiv);
  const cardImage = productDiv.querySelector("img");
  cardImage.addEventListener("click", () => openProductDialog(product));

  //Add to cart
  const cardCart = productDiv.querySelector(".fa-cart-shopping");
  cardCart.addEventListener("click", () => addToCart(product, 1));
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
  let quantity = 1;
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
      <div class="infoQuantity">
        <p>Quantity: </p>
        <div class="quantity">
          <button class="decreaseQuantity"><i class="fa-solid fa-circle-arrow-left"></i></button>
          <p>${quantity}</p>
          <button class="increaseQuantity"><i class="fa-solid fa-circle-arrow-right"></i></button>
        </div>
      </div>
      <button class=infoButton>Add To Cart</button>
    </div>
  `
  const infoXButton = document.querySelector(".infoTitle .fa-xmark");
  infoXButton.addEventListener("click", () => {
    productDialog.close();
  })

  /* CHANGE QUANTITY */

  const quantityP = document.querySelector(".quantity p");

  const decreaseQuantity = document.querySelector(".decreaseQuantity")
  decreaseQuantity.addEventListener("click", () => {
    quantity -= 1;
    quantityP.textContent = quantity;
    quantity === 1 ? decreaseQuantity.disabled = true : decreaseQuantity.disabled = false;
  })

  const increaseQuantity = document.querySelector(".increaseQuantity")
  increaseQuantity.addEventListener("click", () => {
    quantity += 1;
    quantityP.textContent = quantity;
    quantity === 1 ? decreaseQuantity.disabled = true : decreaseQuantity.disabled = false;
  })

  quantity === 1 ? decreaseQuantity.disabled = true : decreaseQuantity.disabled = false;

  /* ADD TO CART */

  const addToCartButton = document.querySelector(".infoButton");
  addToCartButton.addEventListener("click", () => {
    addToCart(product, quantity)
    productDialog.close();
  });
}

function addToCart(product, quantity) {
  if (cartArray.length === 0) {
    cartProductsSection.innerHTML = "";
  }

  const productData = {
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    quantity: quantity
  };

  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(productData),
  };

  const findProduct = cartArray.find(obj => obj.title === product.title);

  if (findProduct) {
    alert("Item already in cart!");
  } else {
    cartArray.push(productData);
    cartTextContent.textContent = cartArray.length;
    cartArray.length === 0 ? cartTextContent.style.display = "none" : cartTextContent.style.display = "block";
    total.textContent = `Total: $${cartTotal()}`;
    fetch("https://edzon-db.onrender.com/cart", configurationObject)
      .then(res => res.json())
      .then((cartProduct) => renderCartProduct(cartProduct));
  }
}