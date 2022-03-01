"use strict";

const close = document.getElementById("close");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
  showMenu();
});

close.addEventListener("click", () => {
  hideMenu();
});

document.addEventListener("click", e => {
  if (e.target.className === "header__nav" || e.target.className === "header__nav-item" || e.target.className === "header__hamburger") return;

  hideMenu();
});

const showMenu = () => {
  nav.style.display = "flex";
  menu.style.display = "none";
  close.style.display = "block";
};

const hideMenu = () => {
  nav.style.display = "none";
  menu.style.display = "block";
  close.style.display = "none";
};
