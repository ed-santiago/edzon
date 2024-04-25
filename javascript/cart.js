let cartArray = [];
let cartCounter = 0;
const cartTextContent = document.querySelector("#header_icons .fa-cart-shopping p");

fetch("https://edzon-db.onrender.com/cart")
  .then(res => res.json())
  .then(cartProducts => {
    cartArray = cartProducts;
    cartCounter += cartArray.length;
    cartTextContent.textContent = cartCounter;
    if (cartArray.length === 0) {
      cartTextContent.style.display = "none";
    } else {
      cartTextContent.style.display = "block";
    }
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

  const findProduct = cartArray.find(obj => obj === product);

  if (findProduct) {
    alert("Item already in cart!");
  } else {
    fetch("https://edzon-db.onrender.com/cart", configurationObject)
      .then(res => res.json())
      .then(() => {
        cartCounter += 1
        cartTextContent.textContent = cartCounter
      });
  }
}