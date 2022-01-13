// Re-scroll more information to top once hover is left

const moreInfo = document.getElementsByClassName("projects__text-group");
for (let i = 0; i < moreInfo.length; i++) {
  moreInfo[i].addEventListener("mouseleave", (e) => {
    e.target.scrollTo(0, 0);
  });
}

// Image slider

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  effect: "creative",
  creativeEffect: {
    prev: {
      // will set `translateZ(-400px)` on previous slides
      translate: [0, 0, -400],
    },
    next: {
      // will set `translateX(100%)` on next slides
      translate: ["100%", 0, 0],
    },
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  // Navigation arrows
  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
