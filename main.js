document.addEventListener("DOMContentLoaded", function() {
  const exponentInput = document.getElementById("exponent");
  const resultNormal = document.getElementById("result-normal");
  const resultScientific = document.getElementById("result-scientific");

  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  const multiplyResultNormal = document.getElementById("multiply-result-normal");
  const multiplyResultScientific = document.getElementById("multiply-result-scientific");

  const conversionBtns = document.querySelectorAll(".conversion-btn");
  const fillBtns = document.querySelectorAll(".fill-btn");

  exponentInput.addEventListener("input", updateResult);
  input1.addEventListener("input", calculateMultiplication);
  input2.addEventListener("input", calculateMultiplication);

  conversionBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const factor = parseFloat(btn.getAttribute("data-factor"));
      const exponentValue = parseFloat(exponentInput.value);
      const result = factor * Math.pow(10, exponentValue);
      resultNormal.textContent = result.toLocaleString();
      resultScientific.textContent = `10^${exponentValue}`;
    });
  });

  fillBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const value = parseFloat(btn.getAttribute("data-value"));
      input1.value = value.toLocaleString();
    });
  });

  function updateResult() {
    const exponentValue = parseFloat(exponentInput.value);
    const result = Math.pow(10, exponentValue);
    resultNormal.textContent = result.toLocaleString();
    resultScientific.textContent = `10^${exponentValue}`;
  }

  function calculateMultiplication() {
    const value1 = parseFloat(input1.value.replace(/,/g, ""));
    const value2 = parseFloat(input2.value.replace(/,/g, ""));
    const result = value1 * value2;
    multiplyResultNormal.textContent = result.toLocaleString();
    multiplyResultScientific.textContent = result.toExponential();
  }
});
