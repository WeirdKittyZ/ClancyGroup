---
layout: post
title: SIMPLE TEST EXAMPLE
date: 2024-09-18
author: 
  - Weird Kitty
tags: 
  - Test
toc:  false
---

### Test:

---
title: Simple Calculator
---

## Try the calculator

<input id="x" type="number" />
+
<input id="y" type="number" />
<button onclick="add()">Calculate</button>

<p>Result: <span id="out"></span></p>

<script>
function add() {
  const x = Number(document.getElementById("x").value);
  const y = Number(document.getElementById("y").value);
  document.getElementById("out").textContent = x + y;
}
</script>

### Another test:
<h3>Sum Calculator 1</h3>
<div class="calculator">
  <input type="number" class="num1" placeholder="Enter number 1">
  <input type="number" class="num2" placeholder="Enter number 2">
  <button class="calculateButton">Calculate Sum</button>
  <div class="result"></div>
</div>

<h3>Sum Calculator 2</h3>
<div class="calculator">
  <input type="number" class="num1" placeholder="Enter number 1">
  <input type="number" class="num2" placeholder="Enter number 2">
  <button class="calculateButton">Calculate Sum</button>
  <div class="result"></div>
</div>

<!-- Link to the external JavaScript file -->
<script src="/PostFile/Test/calculator.js"></script>
