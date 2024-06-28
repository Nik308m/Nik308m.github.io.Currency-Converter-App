// script.js

document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultText = document.getElementById('result');

    // Fetch available currencies from the API
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.textContent = currency;
                option1.value = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.textContent = currency;
                option2.value = currency;
                toCurrencySelect.appendChild(option2);
            });
        });

    // Event listener for the convert button
    convertBtn.addEventListener('click', function() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // Fetch exchange rate from API
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const exchangeRate = data.rates[toCurrency];
                if (exchangeRate) {
                    const convertedAmount = amount * exchangeRate;
                    resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
                } else {
                    resultText.textContent = 'Error: Exchange rate not found for selected currencies.';
                }
            })
            .catch(error => {
                resultText.textContent = 'Error fetching data. Please try again later.';
            });
    });
});
