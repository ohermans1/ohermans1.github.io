// Item Counter

const itemPlus = document.getElementById("itemPlus");
const itemMinus = document.getElementById("itemMinus");
let itemCounter = document.getElementById("itemCounter");
let itemCount = 0;

itemPlus.addEventListener("click", () => {
  itemCount++;
  itemCounter.innerHTML = itemCount;
});
itemMinus.addEventListener("click", () => {
  if (itemCount === 0) {
    return;
  }
  itemCount--;
  itemCounter.innerHTML = itemCount;
});

//Add to cart

const addToCart = document.getElementById("addToCart");
const cartCounter = document.getElementById("cartCounter");
var cartCount = 0;

addToCart.addEventListener("click", () => {
  cartCount = cartCount + itemCount;
  if (cartCount === 0) {
    cartCounter.innerHTML = cartCount;
    cartCounter.style.display = "none";
    return;
  }
  cartCounter.style.display = "flex";
  cartCounter.innerHTML = cartCount;
});

//Show and hide cart

const cartButton = document.getElementById("cartButton");
const cartDisplay = document.getElementById("cartDisplay");
const cartEmpty = document.getElementById("cartEmpty");
const cartFull = document.getElementById("cartFull");
const totalProduct = document.getElementById("totalProduct");
const totalProductValue = document.getElementById("totalProductValue");

cartButton.addEventListener("click", () => {
  if (cartDisplay.style.display === "none") {
    if (cartCount === 0) {
      cartEmpty.style.display = "block";
    } else {
      totalProduct.innerHTML = cartCount;
      totalProductValue.innerHTML = cartCount * 125;
      cartFull.style.display = "grid";
    }

    cartDisplay.style.display = "flex";
  } else {
    cartDisplay.style.display = "none";
    cartEmpty.style.display = "none";
    cartFull.style.display = "none";
  }
});

// Hide cart if anything else is clicked
document.addEventListener("click", (e) => {
  if (e.target.parentNode.id != "cartDisplay" && e.target.id != "cartDisplay" && e.target.id != "cartButton" && e.target.parentNode.id != "cartFull" && e.target.parentNode.id != "cartPrice") {
    cartDisplay.style.display = "none";
    cartEmpty.style.display = "none";
    cartFull.style.display = "none";
  }
});

//Clear Cart

const clearCart = document.getElementById("clearCart");
clearCart.addEventListener("click", () => {
  cartCount = 0;
  cartFull.style.display = "none";
  cartEmpty.style.display = "block";
  cartCounter.style.display = "none";
});

//Change selected thumbnail and the large image through adding and removing classnames

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery__thumbnail")) {
    var selectedThumbnail = document.querySelector(".gallery__img--selected-thumbnail");
    selectedThumbnail.classList.remove("gallery__img--selected-thumbnail");
    var selectedBorder = document.querySelector(".gallery__border--selected");
    selectedBorder.classList.remove("gallery__border--selected");
    selectedBorder.previousElementSibling.classList.remove("gallery__img--selected-large");
    selectedBorder.previousElementSibling.classList.add("gallery__img--hidden");
    e.target.classList.add("gallery__img--selected-thumbnail");
    e.target.parentNode.classList.add("gallery__border--selected");
    e.target.parentNode.previousElementSibling.classList.add("gallery__img--selected-large");
    e.target.parentNode.previousElementSibling.classList.remove("gallery__img--hidden");
  }
});

//SHADOW BOX

const shadowBox = document.getElementById("shadowBox");
const shadowBoxClose = document.getElementById("sbClose");
const galleryImages = document.getElementsByClassName("gallery__img");
const mainImg = document.getElementById("mainImage");
var imgReferenceNum = 0;
//Set large image
document.addEventListener("click", (e) => {
  if (e.target.getAttribute("value") > 0) {
    imgReferenceNum = e.target.getAttribute("value");
    mainImg.style.backgroundImage = "url('https://www.olliehermans.com/ecommerce/images/image-product-" + imgReferenceNum + ".jpg')";
    if (document.getElementById("shadow-box__thumbnail--selected-thumbnail") === null) {
      document.getElementById("thumb" + imgReferenceNum).classList.add("shadow-box__thumbnail--selected-thumbnail");
    }
    shadowBox.style.display = "block";
  }
});

const arrowNext = document.getElementById("arrowNext");
const arrowPrev = document.getElementById("arrowPrev");

document.addEventListener("click", (e) => {
  if (e.target === arrowNext) {
    if (imgReferenceNum === 4 || imgReferenceNum === "4") {
      imgReferenceNum = 1;
    } else {
      imgReferenceNum++;
    }
    mainImg.style.backgroundImage = "url('https://www.olliehermans.com/ecommerce/images/image-product-" + imgReferenceNum + ".jpg')";
  } else if (e.target === arrowPrev) {
    if (imgReferenceNum === 1 || imgReferenceNum === "1") {
      imgReferenceNum = 4;
    } else {
      imgReferenceNum--;
    }
    mainImg.style.backgroundImage = "url('https://www.olliehermans.com/ecommerce/images/image-product-" + imgReferenceNum + ".jpg')";
  }
  while (document.querySelector(".shadow-box__thumbnail").classList.contains(".shadow-box__thumbnail--selected-thumbnail")) {
    var selectedThumbnail = document.querySelector(".shadow-box__thumbnail--selected-thumbnail");
    selectedThumbnail.classList.remove("shadow-box__thumbnail--selected-thumbnail");
  }
  document.getElementById("thumb" + imgReferenceNum).classList.add("shadow-box__thumbnail--selected-thumbnail");
});

//Shadow box thumbnails
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("shadow-box__thumbnail")) {
    while (document.querySelector(".shadow-box__thumbnail").classList.contains(".shadow-box__thumbnail--selected-thumbnail")) {
      var selectedThumbnail = document.querySelector(".shadow-box__thumbnail--selected-thumbnail");
      selectedThumbnail.classList.remove("shadow-box__thumbnail--selected-thumbnail");
    }
    e.target.classList.add("shadow-box__thumbnail--selected-thumbnail");
  }
});

//Close shadow box
shadowBoxClose.addEventListener("click", () => {
  shadowBox.style.display = "none";
  var selectedThumbnail = document.querySelector(".shadow-box__thumbnail--selected-thumbnail");
  selectedThumbnail.classList.remove("shadow-box__thumbnail--selected-thumbnail");
});

//Mobile Menu

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.style.display = "block";
  mobileMenuClose.style.display = "block";
});

mobileMenuClose.addEventListener("click", () => {
  mobileMenu.style.display = "none";
  mobileMenuClose.style.display = "none";
});
