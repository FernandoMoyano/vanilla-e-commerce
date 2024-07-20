console.log("Archivo poo.js cargado correctamente");

//POO.JS
// ─── Clase Product ───────────────────────────────────────────────────────────

export class Product {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  get Price() {
    return this.price;
  }

  getDescription() {
    return `${this.id}-${this.title}-${this.price}`;
  }
}

// ─── Clase Cart ──────────────────────────────────────────────────────────────

export class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(product, quantity) {
    if (this.items[product.id]) {
      this.items[product.id].quantity += quantity;
    } else {
      this.items[product.id] = { product, quantity };
    }
  }

  removeFromCart(id) {
    if (this.items[id]) {
      delete this.items[id];
    }
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    for (const item of Object.values(this.items)) {
      totalPrice += item.product.price * item.quantity;
    }
    return totalPrice;
  }

  calculatePartialPrice(id) {
    if (this.items[id]) {
      return this.items[id].product.price * this.items[id].quantity;
    } else {
      return 0;
    }
  }

  increaseQuantity(id) {
    this.items[id].quantity++;
  }

  decreaseQuantity(id) {
    if (this.items[id].quantity > 1) {
      this.items[id].quantity--;
    }
  }

  clearCart() {
    this.items = [];
  }
}

// ─── Clase Order ─────────────────────────────────────────────────────────────

export class Order {
  constructor(orderId, cart, status = "pending") {
    this.orderId = orderId;
    this.cart = cart;
    this.status = status;
  }

  calculateTotalPrice() {
    return this.cart.calculateTotalPrice();
  }

  cancelOrder() {
    if (this.status === "pending") {
      this.status = "cancelled";
      console.log("Order cancelled.");
    } else {
      console.log("Order cannot be cancelled.");
    }
  }

  confirmOrder() {
    if (this.status === "pending") {
      this.status = "confirmed";
      console.log("Order confirmed.");
    } else {
      console.log("Order cannot be confirmed.");
    }
  }

  trackOrder() {
    console.log(
      `The current status of your order ${this.orderId} is ${this.status}.`
    );
  }
}
