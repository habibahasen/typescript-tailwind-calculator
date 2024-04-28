const resultDisplay = document.getElementById("result") as HTMLInputElement;
const buttons = Array.from(
  document.querySelectorAll("button")
) as HTMLButtonElement[];

let currentNumber: string = "";
let firstOperand: string = "";
let operator: string = "";

function clear(): void {
  currentNumber = "";
  firstOperand = "";
  operator = "";
  updateDisplay();
}

function updateDisplay(): void {
  if (operator) {
    resultDisplay.value = firstOperand + operator + currentNumber;
  } else {
    resultDisplay.value = currentNumber || "0";
  }
}

function appendNumber(num: string): void {
  currentNumber += num;
  updateDisplay();
}

function appendDecimal(): void {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    updateDisplay();
  }
}

function setOperator(op: string): void {
  if (operator) {
    calculate();
  }
  firstOperand = currentNumber;
  currentNumber = "";
  operator = op;
  updateDisplay();
}

function calculate(): void {
  const secondOperand = currentNumber;
  let result: number;
  switch (operator) {
    case "+":
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case "-":
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case "*":
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case "/":
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
    default:
      return;
  }
  currentNumber = result.toString();
  operator = "";
  firstOperand = "";
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (value && /[0-9]/.test(value)) {
      appendNumber(value);
    } else if (value === ".") {
      appendDecimal();
    } else if (value === "AC") {
      clear();
    } else if (value === "=") {
      calculate();
    } else if (value) {
      setOperator(value);
    }
  });
});
