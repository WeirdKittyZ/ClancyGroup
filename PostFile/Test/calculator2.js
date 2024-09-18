function calculateProduct() {
  var num1 = parseFloat(document.getElementById('num3').value);
  var num2 = parseFloat(document.getElementById('num4').value);
  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById('result2').innerText = 'Please enter valid numbers!';
    return;
  }
  var result = num1 * num2;
  document.getElementById('result2').innerText = 'Product: ' + result;
}
