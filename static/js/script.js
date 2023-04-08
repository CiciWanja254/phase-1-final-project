class Cart {
    constructor() {
      this.items = [];
    }

    addItem(item) {
      const existingItem = this.items.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    }

    removeItem(item) {
      const existingItem = this.items.find((i) => i.name === item.name);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          this.items = this.items.filter((i) => i.name !== item.name);
        }
      }
    }

    getTotal() {
      return this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }

    getQuantity() {
      return this.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    }

    clear() {
      this.items = [];
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetch("https://wide254.pythonanywhere.com/api/cici/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.products);
        data = data.products;
        const container = document.querySelector(".container");

        data.forEach((product) => {
          const card = document.createElement("div");
          card.classList.add("card");

          const image = document.createElement("img");
          image.src = product.image;
          image.alt = product.name;
          card.appendChild(image);

          const name = document.createElement("h2");
          name.textContent = product.name;
          card.appendChild(name);

          const price = document.createElement("p");
          price.textContent = `Ksh ${product.price.toFixed(2)}`;
          card.appendChild(price);

          const button = document.createElement("button");
          button.classList.add("add-to-cart");
          button.dataset.name = product.name;
          button.dataset.price = product.price.toFixed(2);
          button.textContent = "Add to Cart";
          card.appendChild(button);

          button.addEventListener("click", () => {
            const item = product;
            cart.addItem(item);
            updateCart();
          });

          container.appendChild(card);
        });
      })
      .catch((error) => console.error(error));
  });

  const cartBtn = document.getElementById("cart-btn");
  const cartNav = document.querySelector(".cart-nav");
  const cartList = document.querySelector(".cart-list");
  const cartTotal = document.querySelector(".cart-total span");
  const checkoutBtn = document.querySelector(".checkout");
  const closeBtn = document.querySelector(".close-cart");
  const cart = new Cart();

  // Add event listener to cart button to toggle cart nav
  cartBtn.addEventListener("click", () => {
    cartNav.classList.toggle("open");
    updateCart();
  });

  closeBtn.addEventListener("click", () => {
    cartNav.classList.toggle("open");
  });

  // Add event listener to checkout button to clear cart and show alert
  checkoutBtn.addEventListener("click", () => {
    if (cart.getQuantity() > 0) {
      alert("Thank you for your purchase!");
      cart.clear();
      updateCart();
    }
  });

  // Function to update cart nav with current cart contents
  function updateCart() {
    cartList.innerHTML = "";
    let total = 0;
    cart.items.forEach((item, index) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.name;
      cartItem.appendChild(image);

      const cartItemInfo = document.createElement("div");
      cartItemInfo.classList.add("cart-item-info");

      const itemName = document.createElement("h3");
      itemName.textContent = item.name;
      cartItemInfo.appendChild(itemName);

      const itemPrice = document.createElement("p");
      itemPrice.textContent = `Ksh ${item.price.toFixed(2)}`;
      cartItemInfo.appendChild(itemPrice);

      const itemQuantity = document.createElement("p");
      itemQuantity.textContent = `Qty: ${item.quantity}`;
      cartItemInfo.appendChild(itemQuantity);

      cartItem.appendChild(cartItemInfo);

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-from-cart");
      removeButton.textContent = "Remove";
      cartItem.appendChild(removeButton);

      removeButton.addEventListener("click", () => {
        cart.removeItem(item);
        updateCart();
      });

      cartList.appendChild(cartItem);

      total += item.price * item.quantity;
    });
    cartTotal.textContent = `Ksh ${total.toFixed(2)}`;
    cartBtn.textContent = `Cart (${cart.getQuantity()})`;
  }