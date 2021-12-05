// Functions

const contactAppear = () => {
  const currentScroll = window.scrollY;
  const screenHeight = screen.height;
  if (currentScroll <= screenHeight / 1.16) {
    opacity = 0;
  } else {
    opacity = 1;
  }
  document.getElementById("secondContact").style.opacity = opacity;
};

//!! Function to fade out scroll down text

const scrollFade = () => {
  const currentScroll = window.scrollY;
  const checkpoint = 100;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
  } else {
    opacity = 0;
  }
  document.getElementById("scroll").style.opacity = opacity;
};

//!! Function to fade in project cards

//* Checks if element is visible on screen
const elementOutOfView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

//* Displays scrolled element by changing class to .scrolled, once visible on screen
const displayScrollElement = (e) => {
  e.classList.add("scrolled");
};

//* Hides scrolled element by changing class to .scrolled, once visible on screen
const hideScrollElement = (e) => {
  e.classList.remove("scrolled");
};

//* Animation for scrolled element, currently set to appear from bottom
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutOfView(el)) {
      hideScrollElement(el);
    }
  });
};

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

//!! Show name and contact infomation once you reach the all project page

//!! Functions to open and close Modals

//* Open Modal function

const openModal = (e) => {
  if (e.target.className === "moreInfo") {
    var tempValue = e.target.value;
    var tempModal = document.getElementById("modal" + tempValue);
    tempModal.style.display = "block";
  }
};
//* Close Modal Function for both x button and click out of modal

const closeModal = (e) => {
  if (e.target.className === "close") {
    var tempValue = e.target.value;
    var tempModal = document.getElementById("modal" + tempValue);
    tempModal.style.display = "none";
  }
  if (e.target.className === "modal") {
    var temp = e.target;
    temp.style.display = "none";
  }
};

// Code

//!! Set Variables for Modals and create arrays and ids for scaling with different numbers of projects

var moreInfoButtons = document.getElementsByClassName("moreInfo");
var closeButtons = document.getElementsByClassName("close");
var modalArray = document.getElementsByClassName("modal");

for (var i = 0; i < moreInfoButtons.length; i++) {
  moreInfoButtons[i].value = i;
  closeButtons[i].value = i;
  modalArray[i].id = "modal" + i;
}

//! Event listener for scroll card fade-in
window.addEventListener("scroll", () => {
  scrollFade();
  contactAppear();
});

//! Event listener for project card fade-in
window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

//! Open and Close specific modals
document.addEventListener("click", (e) => {
  openModal(e);
});

document.addEventListener("click", (e) => {
  closeModal(e);
});

//* Test
