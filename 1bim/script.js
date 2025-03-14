const display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = null;

// Function to clear the calculator
document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  operator = null;
  previousValue = null;
  display.textContent = '0';
});

// Function to handle number clicks
document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    currentInput += button.dataset.value;
    display.textContent = currentInput;
  });
});

// Function to handle operator clicks
document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput) {
      if (previousValue === null) {
        previousValue = parseFloat(currentInput);
      } else {
        previousValue = calculate(previousValue, parseFloat(currentInput), operator);
      }
      operator = button.dataset.value;
      currentInput = '';
      display.textContent = previousValue;
    }
  });
});

// Function to handle equals button
document.getElementById('equals').addEventListener('click', () => {
  if (previousValue !== null && currentInput && operator) {
    const result = calculate(previousValue, parseFloat(currentInput), operator);
    display.textContent = result;
    previousValue = null;
    currentInput = '';
    operator = null;
  }
});

// Function to calculate result
function calculate(a, b, op) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error';
    default:
      return b;
  }
}

// Function to handle percent button
document.getElementById('percent').addEventListener('click', () => {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) / 100).toString();
    display.textContent = currentInput;
  }
});

// Turn calculator on/off
document.getElementById('on').addEventListener('click', () => {
  display.textContent = '0';
  currentInput = '';
  previousValue = null;
  operator = null;
});

document.getElementById('off').addEventListener('click', () => {
  display.textContent = '';
  currentInput = '';
  previousValue = null;
  operator = null;
});
