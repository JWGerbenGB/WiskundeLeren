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


  // Function to calculate the maximum width for the blocks
  function calculateMaxWidth() {
    let maxWidth = 0;
    const rows = document.querySelectorAll(".row");
    rows.forEach(row => {
      let rowWidth = 0;
      const elements = row.querySelectorAll(".conversion-btn, .fill-btn, label");
      elements.forEach(element => {
        rowWidth += element.offsetWidth;
      });
      if (rowWidth > maxWidth) {
        maxWidth = rowWidth;
      }
    });
    return maxWidth;
  }

  // Set the maximum width for the blocks
  const blocks = document.querySelectorAll(".block");
  const maxWidth = calculateMaxWidth();
  blocks.forEach(block => {
    block.style.maxWidth = `${maxWidth}px`;
  });


  const formatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
    useGrouping: true,
    grouping: ".",
    decimal: ","
  };

  exponent.addEventListener("input", updateResult);

  // Event listeners for input fields
  input1.addEventListener("input", function() {
    console.log("Vala");
    calculateMultiplication();
    console.log("Valb");
    updateScientificLabels();
    console.log("Valc");
  });

  input2.addEventListener("input", function() {
    calculateMultiplication();
    updateScientificLabels();
  });

  conversionBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const factor = parseFloat(btn.getAttribute("data-factor"));
      speech.innerHTML = `${btn.textContent} = ${formatNumber(factor)} = ${formatScientificNotation(factor.toExponential())}`;
    });
  });

  fillBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const value = customParseFloat(btn.getAttribute("data-value"));
      const row = btn.closest('.row');
      const label = row.querySelector('label').textContent;
      if (label.includes("Eerste nummer")) {
        input1.value = formatNumber(value);
      } else if (label.includes("Tweede nummer")) {
        input2.value = formatNumber(value);
      }
      calculateMultiplication();
      updateScientificLabels();
    });
  });

  function updateResult() {
    const resultValue = Math.pow(10, exponent.value);
    resultNormal.textContent = formatNumber(resultValue)
    resultScientific.innerHTML = formatScientificNotation(resultValue.toExponential())
  }

  function calculateMultiplication() {
    const value1 = customParseFloat(input1.value);
    const value2 = customParseFloat(input2.value);
    const result = value1 * value2;
    multiplyResultNormal.textContent = formatNumber(result);
    multiplyResultScientific.innerHTML = formatScientificNotation(result.toExponential())
  }

  function formatScientificNotation(exponentialString) {
    return exponentialString.replace(/e([-+]?)(\d+)/, function(match, sign, exponent) {
      if (sign === "-") {
        return " · 10<sup>-" + exponent + "</sup>";
      } else {
        return " · 10<sup>" + exponent + "</sup>";
      }
    });
  }

  function formatNumber(number) {
    const formattedNumber = number.toLocaleString('nl-NL', formatOptions);
    if (Math.abs(number) < 1 && Math.abs(number) > 0) {
      const decimalPart = formattedNumber.split(',')[1] || '0'; // Extract decimal part or default to '0'
      return `0,${decimalPart}`;
    } else {
      return formattedNumber;
    }
  }

  function customParseFloat(str) {
    if (str.includes(",")) {
      const [integerPart, decimalPart] = str.split(",");
      const integer = parseInt(integerPart.replace(/\./g, ""));
      const decimal = parseInt(decimalPart)/ Math.pow(10, decimalPart.length);
      return isNaN(integer) ? 0 : integer + decimal;
    } else {
      const integerPart = str.replace(/\./g, "");
      return parseInt(integerPart) || 0;
    }
  }

  function updateScientificLabels() {
    const value1 = customParseFloat(input1.value);
    const value2 = customParseFloat(input2.value);
    console.log("Value 1:", value1);
    console.log("Value 2:", value2);
    input1ss.innerHTML = formatScientificNotation(value1.toExponential());
    input2ss.innerHTML = formatScientificNotation(value2.toExponential());
  }


});