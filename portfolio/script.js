// Functions

//!! Function to fade out scroll down text

const scrollFade = () => {
  const currentScroll = window.pageYOffset;
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

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

//* Displays scrolled element by changing class to .scrolled, once visible on screen
const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

//* Hides scrolled element by changing class to .scrolled, once visible on screen
const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
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

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

// Code

//! Event listener for scroll card fade-in
window.addEventListener("scroll", () => {
  scrollFade();
});

//! Event listener for project card fade-in
window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

//* Test
