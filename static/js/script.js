const cartBtn = document.getElementById("cart-btn");
      const cartNav = document.querySelector(".cart-nav");
      const cartList = document.querySelector(".cart-list");
      const cartTotal = document.querySelector(".cart-total span");
      const checkoutBtn = document.querySelector(".checkout");
      const closeBtn = document.querySelector(".close-cart");

      let cart = [];

      // Add event listener to cart button to toggle cart nav
      cartBtn.addEventListener("click", () => {
        cartNav.classList.toggle("open");
      });

      closeBtn.addEventListener("click", () => {
        cartNav.classList.toggle("open");
      });

      // Add event listener to checkout button to clear cart and show alert
      checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
          alert("Thank you for your purchase!");
          cart = [];
          updateCart();
        }
      });

      // Add event listener to add to cart buttons to add item to cart
      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const name = button.getAttribute("data-name");
          const price = parseFloat(button.getAttribute("data-price"));
          const item = { name, price };
          cart.push(item);
          updateCart();
        });
      });

      // Function to update cart nav with current cart contents
      function updateCart() {
        cartList.innerHTML = "";
        let total = 0;
        cart.forEach((item) => {
          const li = document.createElement("li");
          li.innerText = `${item.name}: $${item.price.toFixed(2)}`;
          cartList.appendChild(li);
          total += item.price;
        });
        cartTotal.innerText = `$${total.toFixed(2)}`;
        cartBtn.innerText = `Cart (${cart.length})`;
      }
