//Variables
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");

//Functions
function toggleMenu() {
  mobileMenu.classList.toggle("u-display-height");
}

//Active Code
mobileMenuToggle.addEventListener("click", toggleMenu);
