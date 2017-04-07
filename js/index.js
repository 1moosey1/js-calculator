const DISPLAYMAX = 8;
const LOGMAX = 32;
var displayElement, logElement, answer;
var leftOperand, operator, rightOperand;

$(document).ready(function() {
  
  displayElement = $("#display");
  logElement = $("#log");
  
  leftOperand = "";
  operator = "";
  rightOperand = "";
  answer = false;
  
  $("button").click(handleClick);
});

function handleClick() {
  
  var symbol = $(this).attr("id");
  switch(symbol) {
      
    case '/':
    case '*':
    case '-':
    case '+':
      
      appendOperator(symbol);
      break;
      
    case '.':
      
      decimal();
      break;
      
    case '=':
      
      compute();
      break;
      
    case 'AC':
      
      allClear();
      break;
      
    case 'CE':
      
      clearEntry();
      break;
      
    default:     
      appendNumber(symbol);
  }
}

function appendNumber(number) {
  
  var displayText = displayElement.text();
  var logText = logElement.text();
  
  if(displayText.length < DISPLAYMAX && 
     logText.length < LOGMAX) {
    
    var operand;
    if(operator)      
      operand = rightOperand += number;
    
    else {
      
      if(answer) {
        
        clearEntry();
        answer = false;
      }
      
      operand = leftOperand += number;
    }
      
    updateDisplay(operand);
  }
}

function appendOperator(symbol) {
  
  if(!operator || !rightOperand) {
    
    operator = symbol;
    updateDisplay(operator);
  }
  else {
    
    compute();
    operator = symbol;
  }
}

function decimal() {
  
  var operand;
  if(operator) {
    
    if(!rightOperand.includes("."))
      operand = rightOperand += ".";     
  }        
  else {
      
    if(!leftOperand.includes("."))
      operand = leftOperand += ".";
  }
      
  updateDisplay(operand);
}

function isInt(number) { 
   return number % 1 === 0;
}

function compute() {
  
  if(leftOperand && operator &&
    rightOperand) {
    
    leftOperand = parseFloat(leftOperand);
    rightOperand = parseFloat(rightOperand);
    
    if(operator == "/")
      leftOperand /= rightOperand;
      
    else if(operator == "*")
      leftOperand *= rightOperand;
    
    else if(operator == "-")
      leftOperand -= rightOperand;
    
    else if(operator == "+")
      leftOperand += rightOperand;
    
    if(!isInt(leftOperand))
      leftOperand = leftOperand.toFixed(1);
    
    leftOperand = leftOperand.toString();
    answer = true;
    
    operator = "";
    rightOperand = "";
    
    updateDisplay(leftOperand);
  }
}

function allClear() {
  
  leftOperand = operator = rightOperand = "";
  displayElement.text("0");
  logElement.text("0");
}

function clearEntry() {
  
  if(rightOperand) {
    
    rightOperand = "";
    updateDisplay(operator);
  }
  else if(operator) {
          
    operator = "";
    updateDisplay(leftOperand);
  }
  else
    allClear();
}

function updateDisplay(displayString) {
  
  displayElement.text(displayString);
  logElement.text(leftOperand + operator + rightOperand);
}