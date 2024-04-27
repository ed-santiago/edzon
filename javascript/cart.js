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
        renderCartProduct(cartProduct);
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
    <div class="cart_product">
      <h2>${product.title}</h2>

      <div class="cartInfoContainer">
        <div class="cartPriceQuantity">
          <div class="cart_price">
            <p>Price:</p>
            ${displayCartProductPrice(product)}
          </div>

          <div class="quantity">
            <button class="decreaseQuantity"><i class="fa-solid fa-circle-arrow-left"></i></button>
            <p>${product.quantity}</p>
            <button class="increaseQuantity"><i class="fa-solid fa-circle-arrow-right"></i></button>
          </div>
        </div>

        <div class="subtotal">
          <p>Subtotal</p>
          <p>$${product.price.originalPrice}</p>
        </div>

        <div class="removeItem">
          <p>Remove</p>
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  `
  cartProductsSection.append(cartProductDiv);

  //Update quantity
  let quantity = cartProductDiv.querySelector(".quantity p");
  const decreaseQuantity = cartProductDiv.querySelector(".decreaseQuantity")
  decreaseQuantity.addEventListener("click", () => addOrSubtract(product => product.quantity -= 1))

  const increaseQuantity = cartProductDiv.querySelector(".increaseQuantity")
  increaseQuantity.addEventListener("click", () => addOrSubtract(product => product.quantity += 1))
  product.quantity === 1 ? decreaseQuantity.disabled = true : decreaseQuantity.disabled = false;

  function addOrSubtract(changeQuantity) {
    changeQuantity(product);
    product.quantity === 1 ? decreaseQuantity.disabled = true : decreaseQuantity.disabled = false;
    quantity.textContent = product.quantity;
    updateQuantityFunc(product);
  }

  //Remove item from cart
  cartProductDiv.querySelector(".removeItem .fa-trash").addEventListener("click", () => {
    cartProductDiv.remove();
    cartArray = cartArray.filter(cartProduct => cartProduct !== product);
    cartTextContent.textContent -= 1;
    cartArray.length === 0 ? cartTextContent.style.display = "none" : cartTextContent.style.display = "block";
    fetch(`https://edzon-db.onrender.com/cart/${product.id}`, {
      method: "DELETE"
    })
  })
}

function updateQuantityFunc(product) {
  fetch(`https://edzon-db.onrender.com/cart/${product.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(product),
  })
}

//Display cart product price
function displayCartProductPrice(product) {
  if (product.price.salePrice > 0)
    return `<p class="salePrice">$${product.price.salePrice}</p>`
  else
    return `<p>$${product.price.originalPrice}</p>`
}

//Open cart dialog
const cartDialog = document.querySelector("#cart");
const cartIcon = document.querySelector("#cart_icon");
cartIcon.addEventListener("click", () => cartDialog.showModal());

//Close dialog
const cartDialogXButton = document.querySelector("#cart_title .fa-xmark");
cartDialogXButton.addEventListener("click", () => cartDialog.close());