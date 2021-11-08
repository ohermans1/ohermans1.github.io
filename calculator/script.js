var num1 = "";
var num2 = "";
var operator = "";
var answer = 0;
var counter = 0;
var screen = document.querySelector(".grid-item-screen");
var potentialOperators = ["+", "-", "*", "/"];

// Adjust for mobile
// width: 50vw;
// height: 50vh;
var isMobile = isMobile();
console.log(isMobile);

button = document.getElementsByTagName("button");
document.addEventListener("click", function saveVariables(e) {
  var buttonClicked = e.target.value;
  console.log(buttonClicked);
  if (potentialOperators.includes(buttonClicked)) {
    operator = buttonClicked;
    counter += 1;
    screen.innerHTML = num1 + " " + operator;
  } else if (buttonClicked === "clear") {
    num1 = "";
    num2 = "";
    operator = "";
    answer = 0;
    counter = 0;
    screen.innerHTML = 0;
  } else if (counter === 0 && buttonClicked >= 0) {
    num1 = num1 + buttonClicked;
    screen.innerHTML = num1;
  } else if (counter !== 0 && buttonClicked >= 0) {
    num2 = num2 + buttonClicked;
    screen.innerHTML = num1 + " " + operator + " " + num2;
  } else if (buttonClicked === "." && counter === 0) {
    num1 = num1 + ".";
    screen.innerHTML = num1;
  } else if (buttonClicked === "." && counter !== 0) {
    num2 = num2 + ".";
    screen.innerHTML = num1 + " " + operator + " " + num2;
  } else if (buttonClicked === "=") {
    answer = num1 + operator + num2;
    answer = eval(answer);
    if (!Number.isInteger(answer)) {
      answer = answer.toFixed(1);
    }
    screen.innerHTML = num1 + " " + operator + " " + num2 + " = " + answer;
    num1 = answer;
    num2 = "";
  }
});

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}
