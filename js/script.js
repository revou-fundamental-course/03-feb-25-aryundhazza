/* ##### untuk menampilkan kalkulator ##### */   
const openModalBtn = document.getElementById("openModalBtn")
const calculator = document.getElementById("calculator")

openModalBtn.addEventListener("click", () => {
    if (calculator.style.display ==="none") {
        calculator.style.display = "grid"
    } else {
        calculator.style.display = "none"
    }
})



/* ##### untuk fungsional kalkulator ##### */ 
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');
const celsiusToFahrenheitButton = document.querySelector('button[value="c_to_f"]');

let numInput = ''; 
let isCelsiusToFahrenheit = true; 

// Fungsi untuk menghitung hasil
function calculate() {
  try {
    numInput = eval(numInput).toString(); 
  } catch (e) {
    numInput = 'Error';
  }
  updateDisplay();
}

// Fungsi untuk memperbarui tampilan
function updateDisplay() {
  display.textContent = numInput || '0';
}

// Fungsi untuk mengkonversi suhu dari Celcius ke Fahrenheit
function convertCelsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

// Fungsi untuk mengkonversi suhu dari Fahrenheit ke Celcius
function convertFahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

// Fungsi untuk menampilkan hasil konversi dan cara kalkulasi
function showConversionResult(value) {
  let result;
  let calculationText;
  
  if (isCelsiusToFahrenheit) {
    result = convertCelsiusToFahrenheit(value);
    calculationText = `${value}°C × 9/5 + 32 = ${result.toFixed(2)}°F`;
  } else {
    result = convertFahrenheitToCelsius(value);
    calculationText = `${value}°F - 32 × 5/9 = ${result.toFixed(2)}°C`;
  }

  // Menampilkan hasil konversi di textarea Fahrenheit
  document.getElementById("fahrenheit").value = result.toFixed(2);
  
  // Menampilkan cara kalkulasi di textarea
  document.getElementById("calculation").value = calculationText;
  
  // Menampilkan hasil konversi di display kalkulator
  numInput = result.toFixed(2).toString();
  updateDisplay(); 
}

// Event listener untuk setiap tombol
buttons.forEach(button => {
  button.addEventListener('click', function() {
    const value = button.value;

    if (value === 'clear') {
      numInput = ''; 
    } else if (value === 'backspace') {
      numInput = numInput.slice(0, -1); 
    } else if (value === '=') {
      calculate(); 
    } else if (value === 'c_to_f' || value === 'f_to_c') {
      const inputValue = parseFloat(numInput);
      if (!isNaN(inputValue)) {
        showConversionResult(inputValue); 
      } else {
        numInput = 'Error';
        updateDisplay(); 
      }
    } else {
      numInput += value; 
    }

    updateDisplay(); 
  });
});

function resetFields() {
  numInput = ''; 
  document.getElementById("fahrenheit").value = ''; 
  document.getElementById("calculation").value = ''; 
  updateDisplay(); 
}

// Fungsi untuk membalik (Celsius → Fahrenheit menjadi Fahrenheit → Celsius)
function reverseConversion() {
  isCelsiusToFahrenheit = !isCelsiusToFahrenheit; 
  if (isCelsiusToFahrenheit) {
    celsiusToFahrenheitButton.textContent = "°C → °F";
  } else {
    celsiusToFahrenheitButton.textContent = "°F → °C";
  }

  if (numInput) {
    const value = parseFloat(numInput);
    if (!isNaN(value)) {
      showConversionResult(value);
    }
  }
}
