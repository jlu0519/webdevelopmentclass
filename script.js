// Get the modal and necessary elements
const modal = document.getElementById("cartModal");
const cartButton = document.getElementById("cartButton");
const closeBtn = document.getElementsByClassName("close")[0];
const signUpButton = document.getElementById("signUpButton"); // Only present on certain pages
const cartItemsContainer = document.getElementById("cartItems");
const processOrderButton = document.getElementById("processOrderButton"); // New Process Order button

// Retrieve cart items from localStorage or initialize as an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Open the cart modal when the "Cart" button is clicked
cartButton.onclick = function () {
  updateCartModal(); // Update the cart content before showing
  modal.style.display = "block";
};

// Close the modal when the "x" button is clicked
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close the modal when clicking outside of it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Check if the "Sign up today!" button exists, and add event listener
if (signUpButton) {
  signUpButton.onclick = function () {
    addToCart("Gym Membership");
    alert("Gym Membership has been added to your cart!");
  };
}

// Function to add an item to the cart
function addToCart(item) {
  cartItems.push(item); // Add the item to the cart
  saveCartItems(); // Save cart items to localStorage
  updateCartModal(); // Update the modal content
  alert(item + " has been added to your cart!");
}

// Function to update the cart modal with current items
function updateCartModal() {
  if (cartItems.length > 0) {
    // Display cart items with a delete button next to each one
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
      <div class="cart-item">
        <p>${item}</p>
        <button class="delete-item" data-index="${index}">Delete</button>
      </div>
    `).join('');
    
    // Add event listeners for the delete buttons
    const deleteButtons = document.querySelectorAll(".delete-item");
    deleteButtons.forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index"); // Get the index of the item
        removeFromCart(index); // Call the function to remove the item from the cart
      });
    });
    
    // Enable the "Process Order" button if there are items in the cart
    processOrderButton.style.display = "block";
  } else {
    // Show a message when the cart is empty
    cartItemsContainer.innerHTML = "<p>Cart is currently empty.</p>";
    processOrderButton.style.display = "none"; // Hide the "Process Order" button if the cart is empty
  }
}

// Function to save cart items to localStorage
function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Convert array to string and store in localStorage
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cartItems.splice(index, 1); // Remove the item from the array
  saveCartItems(); // Update localStorage
  updateCartModal(); // Update the modal content
  alert("Item removed from your cart.");
}

// Function to process the order
function processOrder() {
  if (cartItems.length > 0) {
    // Clear the cart items from both localStorage and the cart array
    cartItems = [];
    saveCartItems(); // Update localStorage

    // Update the cart modal
    updateCartModal();

    // Alert the user that their order has been placed
    alert("Your order has been placed. Thank you for shopping with us!");
  } else {
    alert("Your cart is empty. Add items before placing an order.");
  }
}

// Add event listener to the "Process Order" button
processOrderButton.onclick = processOrder;

// Initialize the cart on page load (to display items already in cart)
updateCartModal();
