/* ==============================================================================
# ATTRIBUTION: Calculator Source Code
# Submitted by: course-org/classroom-demos-2026
# Block: 
# Class and Subject Code: 
# ============================================================================== */

/* ====== Your code starts below ====== */

// 1. Constructor Function
function Calculator(previousOperandTextElement, currentOperandTextElement) {
  this.previousOperandTextElement = previousOperandTextElement;
  this.currentOperandTextElement = currentOperandTextElement;
  this.clear();
}

Calculator.prototype.clear = function() {
  this.currentOperand = '0';
  this.previousOperand = '';
  this.operation = undefined;
};

Calculator.prototype.delete = function() {
  if (this.currentOperand === '0') return;
  this.currentOperand = this.currentOperand.toString().slice(0, -1);
  if (this.currentOperand === '') this.currentOperand = '0';
};

Calculator.prototype.appendNumber = function(number) {
  if (number === '.' && this.currentOperand.indexOf('.') !== -1) return;
  if (this.currentOperand === '0' && number !== '.') {
    this.currentOperand = number.toString();
  } else {
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
};

Calculator.prototype.chooseOperation = function(operation) {
  if (this.currentOperand === '' && this.currentOperand !== '0') return;
  if (this.previousOperand !== '') {
    this.compute();
  }
  this.operation = operation;
  this.previousOperand = this.currentOperand;
  this.currentOperand = '';
};

Calculator.prototype.compute = function() {
  var computation;
  var prev = parseFloat(this.previousOperand);
  var current = parseFloat(this.currentOperand);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  switch (this.operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }
  
  this.currentOperand = computation.toString();
  this.operation = undefined;
  this.previousOperand = '';
};

Calculator.prototype.calculatePercent = function() {
  if (this.currentOperand === '' || this.currentOperand === 'Error') return;
  var current = parseFloat(this.currentOperand);
  if (isNaN(current)) return;
  this.currentOperand = (current / 100).toString();
};

Calculator.prototype.updateDisplay = function() {
  this.currentOperandTextElement.innerText = this.currentOperand;
  if (this.operation != null) {
    var operatorSymbol = this.operation;
    if (this.operation === '/') operatorSymbol = '÷';
    if (this.operation === '*') operatorSymbol = '×';
    
    this.previousOperandTextElement.innerText = 
      this.previousOperand + ' ' + operatorSymbol;
  } else {
    this.previousOperandTextElement.innerText = '';
  }
};

// 3. Initialize Calculator using classic document methods
var previousOperandTextElement = document.getElementById('previous-operand');
var currentOperandTextElement = document.getElementById('current-operand');
var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// 4. Use the document object for Event Delegation
document.addEventListener('click', function(event) {
  var target = event.target;
  
  // Ignore clicks that aren't on buttons
  if (target.tagName !== 'BUTTON') return;

  var action = target.getAttribute('data-action');
  var number = target.getAttribute('data-number');

  // Route the click based on the attributes
  if (number !== null) {
    calculator.appendNumber(number);
    calculator.updateDisplay();
  } else if (action === 'operator') {
    calculator.chooseOperation(target.getAttribute('data-value'));
    calculator.updateDisplay();
  } else if (action === 'equals') {
    calculator.compute();
    calculator.updateDisplay();
  } else if (action === 'clear') {
    calculator.clear();
    calculator.updateDisplay();
  } else if (action === 'delete') {
    calculator.delete();
    calculator.updateDisplay();
  } else if (action === 'percent') {
    calculator.calculatePercent();
    calculator.updateDisplay();
  }
});
