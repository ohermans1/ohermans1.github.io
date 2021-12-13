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
  sassBot();
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
  sassBot();
  resetAfterCalc();
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
      frustrationMeter++;
    } else {
      number1 = number1 + value;
      screenNumbers.innerHTML = number1;
    }
  } else {
    if (number2.includes(".")) {
      screenChat.innerHTML = "You can't do more then 1 decimal stupid";
      frustrationMeter++;
    } else {
      number2 = number2 + value;
      screenNumbers.innerHTML = number1 + " " + inUseOperator + " " + number2;
    }
  }
};

const sassBot = () => {
  if (answer <= 20 && answer != "") {
    if (frustrationMeter === 1) {
      screenChat.innerHTML = "Seriously... do you really need a calculator for that?";
      frustrationMeter++;
    } else if (frustrationMeter === 2) {
      screenChat.innerHTML = "You are really wasting my time!";
      frustrationMeter++;
    } else if (frustrationMeter === 3) {
      screenChat.innerHTML = "Please... can you just work this out in your head";
      frustrationMeter++;
    } else if (frustrationMeter === 4) {
      screenChat.innerHTML = "Do your own bloody calculations!";
      screenNumbers.innerHTML = number1 + " " + inUseOperator + " " + number2 + " = " + "Piss off";
      frustrationMeter++;
    } else {
      screenNumbers.innerHTML = "Nope";
      screenChat.innerHTML = "*Silent treatment*";
      frustrationMeter++;
    }
  }

  if (answer > 20 && answer <= 100 && answer != "") {
    if (frustrationMeter === 1) {
      screenChat.innerHTML = "Fine, I can work that out.";
      frustrationMeter++;
    } else if (frustrationMeter === 2) {
      screenChat.innerHTML = "Again? Why are you doing so many calculations?";
      frustrationMeter++;
    } else if (frustrationMeter === 3) {
      screenChat.innerHTML = "I'm sick of this, go get a proper calculator!";
      frustrationMeter++;
    } else if (frustrationMeter === 4) {
      screenChat.innerHTML = "No, I refuse!";
      screenNumbers.innerHTML = number1 + " " + inUseOperator + " " + number2 + " = " + "Piss off";
      frustrationMeter++;
    } else {
      screenNumbers.innerHTML = "Nope";
      screenChat.innerHTML = "*Silent treatment*";
      frustrationMeter++;
    }
  }

  if (answer > 100 && answer != "") {
    if (frustrationMeter === 1) {
      screenChat.innerHTML = "I'll try, but these are pretty big numbers!";
      frustrationMeter++;
    } else if (frustrationMeter === 2) {
      screenChat.innerHTML = "Wow, really pushing me today";
      frustrationMeter++;
    } else if (frustrationMeter === 3) {
      screenChat.innerHTML = "Come on, please I'm worn out from all these calculations";
      frustrationMeter++;
    } else if (frustrationMeter === 4) {
      screenChat.innerHTML = "I can't do it, I don't know the answer";
      screenNumbers.innerHTML = number1 + " " + inUseOperator + " " + number2 + " = " + "???";
      frustrationMeter++;
    } else {
      screenNumbers.innerHTML = "Nope";
      screenChat.innerHTML = "*Silent treatment*";
      frustrationMeter++;
    }
  }

  if (number1.length === 3 || number2.length === 3) {
    screenChat.innerHTML = "This seems like a pretty big number, but I'll manage!";
  } else if (number1.length === 4 || number2.length === 4) {
    screenChat.innerHTML = "This is getting silly now, I'm not a fancy calculator.";
  } else if (number1.length === 5 || number2.length === 5) {
    screenChat.innerHTML = "Umm... no idea how well this is going to work!";
  } else if (number1.length > 5 || number2.length > 5) {
    screenChat.innerHTML = "You are on your own...";
  }
};

const resetAfterCalc = () => {
  number1 = answer;
  answer = "";
  number2 = "";
  inUseOperator = "";
};

//!! Code
var calculatorContainer = document.getElementById("calculator");
var screenNumbers = document.getElementById("screenNumbers");
var screenChat = document.getElementById("screenChat");
var completeScreen = document.getElementById("completeScreen");
let answer = "";
let operators = ["+", "*", "-", "/"];
let inUseOperator = "";
let number1 = "";
let number2 = "";
let frustrationMeter = 1;

calculatorContainer.addEventListener("click", (e) => {
  takeInputs(e);
  if (frustrationMeter >= 7) {
    completeScreen.style.backgroundColor = "black";
  }
});

/* Pseudo Code

1. Add event listener to buttons.
2. Store button values as variables.
3. Show variables on screen.
4. Calculate based on entries once = is pressed



*/
