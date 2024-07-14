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
    UIController.updateCartUI();
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

  /* Manejo de la actualizacion de la interfaz de usurio___________ */
  static updateCartUI() {
    const cartContainer = document.querySelector(".cart__container");
    const totalPriceContainer = document.querySelector(".cart__totalPrice");

    cartContainer.innerHTML = "";

    Object.values(cart.items).forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.setAttribute("data-id", item.product.id);

      cartItem.innerHTML = `
          <div>${item.product.title}</div>
          <div>${item.product.price} x ${item.quantity}</div>
          <div>
            <button class="cart__increase">+</button>
            <button class="cart__decrease">-</button>
            <button class="cart__remove">Eliminar</button>
          </div>
        `;

      cartContainer.appendChild(cartItem);
    });

    totalPriceContainer.innerText = `Total: ${cart.calculateTotalPrice()}`;

    //escucha de eventos para los botones del carro________
    document.querySelectorAll(".cart__increase").forEach((button) => {
      button.addEventListener(
        "click",
        UIController.handleIncreaseQuantityClick
      );
    });

    document.querySelectorAll(".cart__decrease").forEach((button) => {
      button.addEventListener(
        "click",
        UIController.handleDecreaseQuantityClick
      );
    });

    document.querySelectorAll(".cart__remove").forEach((button) => {
      button.addEventListener("click", UIController.handleRemoveProductClick);
    });
  }
}

const addButtons = document.querySelectorAll(".product__add");
addButtons.forEach((button) =>
  button.addEventListener("click", UIController.handleAddProductClick)
);
