// Check if elements are available before accessing them
const cartModal = document.getElementById("cartModal");
const contactUsModal = document.getElementById("contactUsModal");
const cartButton = document.getElementById("cartButton");
const signUpButton = document.getElementById("signUpButton");
const contactUsButton = document.getElementById("contactUsButton");
const closeCartModal = document.getElementById("closeCartModal");
const closeContactUsModal = document.getElementById("closeContactUsModal");
const cartItemsContainer = document.getElementById("cartItems");
const processOrderButton = document.getElementById("processOrderButton");

// Initialize cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Open and close modal functions, with a check if modal exists
function openModal(modal) {
  if (modal) modal.style.display = "block";
}

function closeModal(modal) {
  if (modal) modal.style.display = "none";
}

// Event listeners for cart and contact buttons, with a check if button exists
if (cartButton) {
  cartButton.onclick = () => openModal(cartModal);
}
if (contactUsButton) {
  contactUsButton.onclick = () => openModal(contactUsModal);
}

// Event listeners for close buttons in modals
if (closeCartModal) {
  closeCartModal.onclick = () => closeModal(cartModal);
}
if (closeContactUsModal) {
  closeContactUsModal.onclick = () => closeModal(contactUsModal);
}

// Close modals when clicking outside them
window.onclick = (event) => {
  if (event.target === cartModal) closeModal(cartModal);
  if (event.target === contactUsModal) closeModal(contactUsModal);
};

// Update cart modal content
function updateCartModal() {
  if (cartItems.length > 0) {
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
      <div class="cart-item">
        <p>${item}</p>
        <button class="delete-item" data-index="${index}">Delete</button>
      </div>
    `).join('');
    
    // Add delete event listeners for each item
    document.querySelectorAll(".delete-item").forEach(button => {
      button.onclick = function () {
        removeFromCart(this.getAttribute("data-index"));
      };
    });

    processOrderButton.style.display = "block"; // Show "Process Order" button
  } else {
    cartItemsContainer.innerHTML = "<p>Cart is currently empty.</p>";
    processOrderButton.style.display = "none"; // Hide if cart is empty
  }
}

// Save cart items to localStorage
function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add item to the cart
function addToCart(item) {
  cartItems.push(item);
  saveCartItems();
  updateCartModal();
  alert(`${item} has been added to your cart!`);
}

// Remove item from the cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  saveCartItems();
  updateCartModal();
  alert("Item removed from your cart.");
}

// Process order and clear cart
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

// Event listener for "Process Order" button
if (processOrderButton) {
  processOrderButton.onclick = processOrder;
}

// Initialize cart modal with current items
updateCartModal();

// Add gym membership to the cart on "Sign Up Today!" button click
if (signUpButton) {
  signUpButton.onclick = function() {
    addToCart("Gym Membership - 1 Month");
  };
}

// Add "Individual Yoga Session" to the cart
const yogaSessionButton = document.getElementById("yogaSessionButton");
if (yogaSessionButton) {
  yogaSessionButton.onclick = function() {
    addToCart("Individual Yoga Session");
  };
}

// Add "Group Yoga Session" to the cart
const groupYogaSession = document.getElementById("groupYogaSession");
if (groupYogaSession) {
  groupYogaSession.onclick = function() {
    addToCart("Group Yoga Session");
  };
}

// Add "Individual Pilates Session" to the cart
const individualPilatesSession = document.getElementById("individualPilatesSession");
if (individualPilatesSession) {
  individualPilatesSession.onclick = function() {
    addToCart("Individual Pilates Session");
  };
}

// Add "Group Pilates Session" to the cart
const groupPilatesSession = document.getElementById("groupPilatesSession");
if (groupPilatesSession) {
  groupPilatesSession.onclick = function() {
    addToCart("Group Pilates Session");
  };
}

// Add "Individual Kickboxing Session" to the cart
const individualKickboxingSession = document.getElementById("individualKickboxingSession");
if (individualKickboxingSession) {
  individualKickboxingSession.onclick = function() {
    addToCart("Individual Kickboxing Session");
  };
}

// Add "Group Kickboxing Session" to the cart
const groupKickboxingSession = document.getElementById("groupKickboxingSession");
if (groupKickboxingSession) {
  groupKickboxingSession.onclick = function() {
    addToCart("group Kickboxing Session");
  };
}

// Handle "Contact Us" form submission, with check if form exists
const contactUsForm = document.getElementById("contactUsForm");
const contactEmailInput = document.getElementById("contactEmail");
const contactConfirmationMessage = document.getElementById("contactConfirmation");

if (contactUsForm) {
  contactUsForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh
    const contactEmail = contactEmailInput.value.trim();

    if (contactEmail) {
      contactConfirmationMessage.style.display = "block"; // Show confirmation
      contactUsForm.reset(); // Reset form fields
      localStorage.setItem("contactEmail", contactEmail); // Optionally store email
    } else {
      alert("Please enter a valid email address.");
    }
  });
}


