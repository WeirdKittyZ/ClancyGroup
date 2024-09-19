// calculator.js

window.onload = function() {
  // Get all the calculator containers
  var calculators = document.querySelectorAll('.calculator');
  
  calculators.forEach(function(calculator) {
    // Attach event listener to each button in every calculator
    var button = calculator.querySelector('.calculateButton');
    button.addEventListener('click', function() {
      // Get the input values from the current calculator
      var num1 = parseFloat(calculator.querySelector('.num1').value);
      var num2 = parseFloat(calculator.querySelector('.num2').value);
      
      // Check if the input is valid
      if (isNaN(num1) || isNaN(num2)) {
        calculator.querySelector('.result').innerText = 'Please enter valid numbers!';
        return;
      }

      // Perform the sum
      var result = num1 + num2;

      // Display the result in the result div of the current calculator
      calculator.querySelector('.result').innerText = 'Result: ' + result;
    });
  });
};
