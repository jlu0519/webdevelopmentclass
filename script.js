// Get the modal and necessary elements for Cart and Contact Us
const cartModal = document.getElementById("cartModal");
const contactUsModal = document.getElementById("contactUsModal");

const cartButton = document.getElementById("cartButton");
const signUpButton = document.getElementById("signUpButton");
const contactUsButton = document.getElementById("contactUsButton");

const closeCartModal = document.getElementById("closeCartModal"); // Cart modal close button
const closeContactUsModal = document.getElementById("closeContactUsModal"); // Contact Us modal close button

const cartItemsContainer = document.getElementById("cartItems");
const processOrderButton = document.getElementById("processOrderButton"); // Process Order button

// Initialize cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to open modal
function openModal(modal) {
  modal.style.display = "block";
}

// Function to close modal
function closeModal(modal) {
  modal.style.display = "none";
}

// Event listeners to open modals
cartButton.onclick = () => openModal(cartModal);
contactUsButton.addEventListener("click", () => openModal(contactUsModal));

// Event listeners to close modals
closeCartModal.onclick = () => closeModal(cartModal);
closeContactUsModal.addEventListener('click', () => closeModal(contactUsModal));

// Handle clicking outside modal to close it
window.onclick = (event) => {
  if (event.target === cartModal) {
    closeModal(cartModal);
  }
  if (event.target === contactUsModal) {
    closeModal(contactUsModal);
  }
};

// Function to update the cart modal with current items
function updateCartModal() {
  if (cartItems.length > 0) {
    // Display cart items with delete buttons
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
      <div class="cart-item">
        <p>${item}</p>
        <button class="delete-item" data-index="${index}">Delete</button>
      </div>
    `).join('');

    // Add delete event listeners for each item
    document.querySelectorAll(".delete-item").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        removeFromCart(index); // Remove item from cart
      });
    });

    // Show the "Process Order" button if there are items
    processOrderButton.style.display = "block";
  } else {
    cartItemsContainer.innerHTML = "<p>Cart is currently empty.</p>";
    processOrderButton.style.display = "none"; // Hide button if cart is empty
  }
}

// Function to save cart items to localStorage
function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to add an item to the cart
function addToCart(item) {
  cartItems.push(item);
  saveCartItems();
  updateCartModal();
  alert(`${item} has been added to your cart!`);
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  saveCartItems();
  updateCartModal();
  alert("Item removed from your cart.");
}

// Function to process the order
function processOrder() {
  if (cartItems.length > 0) {
    cartItems = [];
    saveCartItems();
    updateCartModal();
    alert("Your order has been placed. Thank you for shopping with us!");
  } else {
    alert("Your cart is empty. Add items before placing an order.");
  }
}

// Event listener for the "Process Order" button
processOrderButton.onclick = processOrder;

// Update the cart modal on page load
updateCartModal();

// Add gym membership to the cart when "Sign Up Today!" is clicked
if (signUpButton) {
  signUpButton.onclick = function() {
    const membershipItem = "Gym Membership - 1 Month"; // Define the membership item
    addToCart(membershipItem); // Add the gym membership item to the cart
  };
}

// Handle Contact Us form submission
const contactUsForm = document.getElementById("contactUsForm");
const contactEmailInput = document.getElementById("contactEmail");
const contactConfirmationMessage = document.getElementById("contactConfirmation");

contactUsForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  const contactEmail = contactEmailInput.value.trim();

  if (contactEmail) {
    // Simulate form submission and show confirmation message
    contactConfirmationMessage.style.display = "block";
    contactUsForm.reset(); // Reset the form fields

    // Optionally, save the email to localStorage or send it to your backend
    localStorage.setItem("contactEmail", contactEmail); // Store the email in localStorage

    // Clear the email input after submission
    contactEmailInput.value = '';
  } else {
    alert("Please enter a valid email address.");
  }
});

