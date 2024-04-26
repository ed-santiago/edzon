let cartArray = [];
const cartTextContent = document.querySelector("#header_icons .fa-cart-shopping p");

fetch("https://edzon-db.onrender.com/cart")
  .then(res => res.json())
  .then(cartProducts => {
    cartArray = cartProducts;
    cartTextContent.textContent = cartArray.length;
    cartArray.length === 0 ? cartTextContent.style.display = "none" : cartTextContent.style.display = "block";
    renderCartProducts(cartProducts);
  })

function addToCart(product) {
  const productData = {
    title: product.title,
    image: product.image,
    price: product.price,
    quantity: 1
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
    fetch("https://edzon-db.onrender.com/cart", configurationObject)
      .then(res => res.json())
      .then((cartProduct) => {
        cartArray.push(cartProduct);
        cartArray.length === 0 ? cartTextContent.style.display = "none" : cartTextContent.style.display = "block";
        cartTextContent.textContent = cartArray.length;
      });
  }
}

function renderCartProducts(cartProducts) {
  cartProducts.forEach(product => renderCartProduct(product));
}

const cartProductsSection = document.querySelector("#cart_products");

function renderCartProduct(product) {
  const cartProductDiv = document.createElement("div");
  cartProductDiv.classList.add("cartProductDiv");
  cartProductDiv.innerHTML = `
    <figure>
      <img src="${product.image}" alt="${product.title}">
    </figure>
    
  `
  cartProductsSection.append(cartProductDiv);
}

//Open cart dialog
const cartDialog = document.querySelector("#cart");
const cartIcon = document.querySelector("#cart_icon");

cartIcon.addEventListener("click", () => cartDialog.showModal());

//Close dialog
const cartDialogXButton = document.querySelector("#cart_title .fa-xmark");
cartDialogXButton.addEventListener("click", () => cartDialog.close());