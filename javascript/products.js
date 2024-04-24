const productSection = document.querySelector("#product_section");
const productDialog = document.querySelector("#product_dialog");

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
        <div class="price">
        ${displayPrice(product)}
        </div>
      </div>
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
  `
  productSection.append(productDiv);
  productDiv.addEventListener("click", () => {
    productDialog.showModal();
    productDialog.innerHTML = `
      <figure>
        <img src="${product.image}" alt="${product.title}">
      </figure>
      <div></div>
    `
  })
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
      <p class="sale_price">$${price.salePrice}</p>
    `
  } else {
    return `<p>$${price.originalPrice}</p>`
  }
}

//Open product info dialog

function openProductDialog(product) {
  console.log(product);
}