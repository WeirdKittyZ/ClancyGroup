// Ensure the function is called after the page has loaded
window.onload = function() {
  document.getElementById('calculateSumButton').addEventListener('click', function() {
    // Get the input values
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);

    // Check for valid input
    if (isNaN(num1) || isNaN(num2)) {
      document.getElementById('result1').innerText = 'Please enter valid numbers!';
      return;
    }

    // Perform the calculation
    var result = num1 + num2;

    // Display the result in the result1 div
    document.getElementById('result1').innerText = 'Result: ' + result;
  });
};
