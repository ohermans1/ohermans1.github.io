//!! Functions

//? This function takes the input value and sends it to another function depending on its type (operator, number, equals, clear etc)
const takeInputs = (e) => {
  let button = e.target;
  let buttonValue = button.value;
  if (button.tagName != "BUTTON") {
    return;
  }
  if (buttonValue >= 0 && buttonValue <= 9) {
    saveNumbers(buttonValue);
  } else if (operators.includes(buttonValue)) {
    operator(buttonValue);
  } else if (buttonValue === "=") {
    sum(buttonValue);
  } else if (buttonValue === "c") {
    clear(buttonValue);
  } else if (buttonValue === ".") {
    decimal(buttonValue);
  }
};

const saveNumbers = (value) => {
  if (inUseOperator === "") {
    number1 = number1 + value;
    screenNumbers.innerHTML = number1;
  } else {
    number2 = number2 + value;
    screenNumbers.innerHTML = number1 + " " + inUseOperator + " " + number2;
  }
};

const operator = (value) => {
  inUseOperator = value;
  screenNumbers.innerHTML = number1 + " " + inUseOperator;
};

const sum = () => {
  if (number1 === "") {
    screenNumbers.innerHTML = "0";
    return;
  }
  if (number2 === "") {
    screenNumbers.innerHTML = number1;
  }
  answer = math.evaluate(number1 + inUseOperator + number2);
  screenNumbers.innerHTML = number1 + " " + inUseOperator + " " + number2 + " = " + answer;
  number1 = answer;
  number2 = "";
  inUseOperator = "";
};

const clear = (value) => {
  number1 = "";
  number2 = "";
  inUseOperator = "";
  answer = "";
  screenNumbers.innerHTML = "0";
  screenChat.innerHTML = "What do you want now?";
};

const decimal = (value) => {
  if (number2 === "") {
    if (number1.includes(".")) {
      screenChat.innerHTML = "You can't do more then 1 decimal stupid";
    } else {
      number1 = number1 + value;
      screenNumbers.innerHTML = number1;
    }
  } else {
    if (number2.includes(".")) {
      screenChat.innerHTML = "You can't do more then 1 decimal stupid";
    } else {
      number2 = number2 + value;
      screenNumbers.innerHTML = number1 + " " + inUseOperator + " " + number2;
    }
  }
};

const sassBot = () => {
  if (answer <= 20 && answer != "") {
    screenChat.innerHTML = "Seriously... do you really need a calculator for that?";
  }
};

//!! Code
var calculatorContainer = document.getElementById("calculator");
var screenNumbers = document.getElementById("screenNumbers");
var screenChat = document.getElementById("screenChat");
let answer = "";
let operators = ["+", "*", "-", "/"];
let inUseOperator = "";
let number1 = "";
let number2 = "";

calculatorContainer.addEventListener("click", (e) => {
  takeInputs(e);
  sassBot();
});

/* Pseudo Code

1. Add event listener to buttons.
2. Store button values as variables.
3. Show variables on screen.
4. Calculate based on entries once = is pressed



*/
