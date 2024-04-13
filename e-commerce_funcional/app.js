"use strict";

//querySelectorAll retorna una lista de nodos
const buttonAdd = document.querySelectorAll(".product__add");
const cartContainer = document.querySelector(".cart__container");
const cart = [];

/**
 * Description:Funcion que chequea si el productro ya esta agregado
 * al carrito
 * @param {Object} productItem
 *
 */
const checkIfItExists = (productItem) => {
  const isExisting = cart.findIndex((item) => item.id === productItem.id);
  //console.log(isExisting);
  if (isExisting === -1) {
    cart.push({
      ...productItem,
      quantity: 1,
    });
    ShowListOfProductsInCart();
  } else {
    alert(
      "El Producto ya ha sido agregado modifica su cantidad desde el carrito"
    );
  }
};

/**
 * Description:Funcion para agregar el producto al carro
 */
const addToCart = () => {
  buttonAdd.forEach((button) =>
    button.addEventListener("click", (evento) => {
      const buttonAdd = evento.target;
      const product = buttonAdd.closest(".product");
      //console.log(product);
      const productId = product.getAttribute("data-id");
      const productTitle = product.querySelector(".product__title").innerText;
      const productPrice = product.querySelector(".product__price").innerText;

      const productItem = {
        id: productId,
        title: productTitle,
        price: productPrice,
        quantity: null,
      };

      checkIfItExists(productItem);

      console.log(cart);
    })
  );
};

addToCart();

/**
 * Description
 * @returns {any}
 */
const ShowListOfProductsInCart = () => {
  //cartContainer.innerHTML = "";
  if (cart.length === 0) {
    const message = "Cart is Empty";
    const messageContainer = document.createElement("p");
    messageContainer.textContent = message;
    cartContainer.append(messageContainer);
  } else {
    cart.map((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.className = "cart__itemContainer";
      //creamos el titulo
      const title = document.createElement("p");
      title.className = "cart__item";
      title.textContent = item.title;
      itemContainer.append(title);
      //creamos el precio
      const price = document.createElement("p");
      price.className = "cart__item";
      price.textContent = item.price;
      itemContainer.append(price);
      //creamos la cantidad
      const quantity = document.createElement("span");
      quantity.className = "cart__item";
      quantity.textContent = item.quantity;
      itemContainer.append(quantity);

      cartContainer.appendChild(itemContainer);
    });
  }
};
