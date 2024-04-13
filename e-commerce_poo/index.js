//index.js

import { Cart, Product } from "./poo.js";
console.log("Archivo index.js cargado correctamente");

//Array Carrito
const cart = new Cart();

class UIController {
  static handleAddProductClick = (event) => {
    console.log("Button clicked!");
    const button = event.target;
    const card = button.closest(".product");

    const productTitle = card.querySelector(".product__title").innerText;
    const productPrice = parseFloat(
      card.querySelector(".product__price").innerText.replace("$", "")
    );

    const productId = card.getAttribute("data-id");

    const product = new Product(productId, productTitle, productPrice);
    cart.addToCart(product, 1);
    console.log(cart);
  };
}

const addButtons = document.querySelectorAll(".product__add");
addButtons.forEach((button) =>
  button.addEventListener("click", UIController.handleAddProductClick)
);
