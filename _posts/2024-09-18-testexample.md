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
## Add Time from Now Calculator

<p>Current time is taken from your device.</p>

<label>
  Days:
  <input id="days" type="number" value="0" min="0">
</label>
<br>

<label>
  Hours:
  <input id="hours" type="number" value="0" min="0">
</label>
<br>

<label>
  Minutes:
  <input id="minutes" type="number" value="0" min="0">
</label>
<br><br>

<button onclick="addTime()">Calculate</button>

<h3>Result</h3>
<p id="result">—</p>

<script>
function addTime() {
  const days = Number(document.getElementById("days").value || 0);
  const hours = Number(document.getElementById("hours").value || 0);
  const minutes = Number(document.getElementById("minutes").value || 0);

  const now = new Date();

  const totalMinutes =
    (days * 24 * 60) +
    (hours * 60) +
    minutes;

  const future = new Date(now.getTime() + totalMinutes * 60000);

  const optionsDate = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  };

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };

  const dateStr = future.toLocaleDateString(undefined, optionsDate);
  const timeStr = future.toLocaleTimeString(undefined, optionsTime);

  document.getElementById("result").textContent =
    `${dateStr}, ${timeStr}`;
}
</script>

