//index.js

import { Cart, Product } from "./poo.js";
console.log("Archivo index.js cargado correctamente");

//Array Carrito
const cart = new Cart();

class UIController {
  /* Manejo del click al botón agregar_________ */
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
  /* Manejo del click al boton eliminar_________________ */
  static handleRemoveProductClick(event) {
    const button = event.target;
    const productId = button.closest(".cart-item").getAttribute("data-id");

    cart.removeFromCart(productId);
    UIController.updateCartUI();
  }

  /* Manejo del click al botón incrementar cantidad__________ */
  static handleIncreaseQuantityClick(event) {
    const button = event.target;
    const productId = button.closest(".cart-item").getAttribute("data-id");

    cart.increaseQuantity(productId);
    UIController.updateCartUI();
  }

  /* Manejo del click al boton de disminuir cantidad_________ */
  static handleDecreaseQuantityClick(event) {
    const button = event.target;
    const productId = button.closest(".cart-item").getAttribute("data-id");

    cart.decreaseQuantity(productId);
    UIController.updateCartUI();
  }
}

const addButtons = document.querySelectorAll(".product__add");
addButtons.forEach((button) =>
  button.addEventListener("click", UIController.handleAddProductClick)
);
