//querySelectorAll retorna una lista de nodos
const buttonAdd = document.querySelectorAll(".product__add");
const cartContainer = document.querySelector(".cart__container");
const handleQuantity = document.querySelectorAll(".cart__handleQuantity");
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
      const productCard = buttonAdd.closest(".product");
      //console.log(product);
      const productId = productCard.getAttribute("data-id");
      const productTitle =
        productCard.querySelector(".product__title").innerText;
      const productPrice =
        productCard.querySelector(".product__price").innerText;

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
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    const message = "Cart is Empty";
    const messageContainer = document.createElement("p");
    messageContainer.textContent = message;
    cartContainer.append(messageContainer);
  } else {
    cart.map((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.className = "cart__itemContainer";
      itemContainer.setAttribute("data-item-id", item.id);
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

      const buttonDecrement = document.createElement("button");
      buttonDecrement.className = "cart__handleQuantity";
      buttonDecrement.textContent = "-";
      itemContainer.append(buttonDecrement);

      //creamos la cantidad
      const quantity = document.createElement("span");
      quantity.className = "cart__span";
      quantity.textContent = item.quantity;
      itemContainer.append(quantity);

      const buttonIncrement = document.createElement("button");
      buttonIncrement.className = "cart__handleQuantity";
      buttonIncrement.textContent = "+";
      itemContainer.append(buttonIncrement);

      const buttonDelete = document.createElement("button");
      buttonDelete.className = "cart__delete";
      buttonDelete.textContent = "X";
      itemContainer.append(buttonDelete);

      cartContainer.appendChild(itemContainer);
    });
  }
};

//Actuailzar solo el span de cantidad.
const updateQuantityDisplay = (productId, newQuantity) => {
  const item = cartContainer.querySelector(`[data-item-id="${productId}"]`);
  if (item) {
    const quantitySpan = item.querySelector(".cart__span");
    quantitySpan.textContent = newQuantity;
  }
};

//Disminuir la cantidad de un producto
const decrementQuantity = (productId) => {
  const productIndex = cart.findIndex((item) => item.id === productId);
  console.log(productIndex);
  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity--;
      updateQuantityDisplay(productId, cart[productIndex].quantity);
    } else {
      cart.splice(productIndex, 1);
    }
    ShowListOfProductsInCart();
  }
  console.log(cart);
};

//Incrementar la cantidad de un producto
const incrementQuantity = (productId) => {
  const productIndex = cart.findIndex((item) => item.id === productId);
  console.log(productIndex);
  if (productIndex !== -1) {
    cart[productIndex].quantity++;
    updateQuantityDisplay(productId, cart[productIndex].quantity);
    console.log("increment");
  }

  console.log(cart);
};

const deleteProduct = (productId) => {
  const productIndex = cart.findIndex((item) => item.id === productId);
  if (productIndex !== -1) {
    cart.splice([productIndex], 1);
  }
  ShowListOfProductsInCart();
};

//Manejar eventos sobre elementos que se generan dinamicamente
//a través de la delegacion de eventos

cartContainer.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("cart__handleQuantity")) {
    const itemContainerId = evento.target.closest(".cart__itemContainer");
    const itemId = itemContainerId.dataset.itemId;
    if (evento.target.textContent === "-") {
      decrementQuantity(itemId);
    } else if (evento.target.textContent === "+") {
      incrementQuantity(itemId);
    }
  }
  if (evento.target.classList.contains("cart__delete")) {
    const itemContainer = evento.target.closest(".cart__itemContainer");
    const itemId = itemContainer.dataset.itemId;
    deleteProduct(itemId);
    console.log(cart);
  }
});
