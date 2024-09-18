document.addEventListener('DOMContentLoaded', () => {
    // Initialize amount and transactions from localStorage or defaults
    let amount = parseFloat(localStorage.getItem('amount')) || 0.00;
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // DOM elements
    const amountDisplay = document.getElementById('amount');
    const amountDisplay2 = document.getElementById('amount1');
    const historySection = document.getElementById('history-section');
    const historyList = document.getElementById('history-list');
    const addPopup = document.getElementById('popup-add');
    const subtractPopup = document.getElementById('popup-subtract');

    // Function to update the main money display
    function updateDisplay() {
        amountDisplay.textContent = `Rs ${amount.toFixed(2)}`;
        localStorage.setItem('amount', amount);
        amountDisplay2.textContent = `Rs ${amount.toFixed(2)}`;
        localStorage.setItem('amount1', amount);
    }
    
    // Function to update the transaction history list
    function updateHistoryList() {
        historyList.innerHTML = '';
        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.classList.add('history-item');
            li.innerHTML = `
                <div class="transaction-details">
                    <p><strong>${transaction.type === 'add' ? '+' : '-'} ${transaction.amount.toFixed(2)} Rs</strong></p>
                    <p><em>Category:</em> ${transaction.category}</p>
                    <p><em>Description:</em> ${transaction.description}</p>
                    <p><em>Date & Time:</em> ${transaction.timestamp}</p>
                </div>
            `;
            historyList.appendChild(li);
        });
    }

    // Function to show or hide the history section
    function toggleHistorySection(show) {
        if (show) {
            historySection.classList.remove('hidden');
            amountDisplay2.textContent="";
        } else {
            historySection.classList.add('hidden');
            amountDisplay2.textContent = `Rs ${amount.toFixed(2)}`;
        localStorage.setItem('amount1', amount);
        }
    }

    // Event listener for add button
    document.getElementById('add').addEventListener('click', () => {
        addPopup.style.display = 'flex';
    });

    // Event listener for submit add transaction
    document.getElementById('submitAmountAdd').addEventListener('click', () => {
        const value = parseFloat(document.getElementById('amountInputAdd').value);
        const category = document.getElementById('categoryAdd').value;
        const description = document.getElementById('descriptionAdd').value || 'No description';

        if (!isNaN(value)) {
            amount += value;
            transactions.push({
                type: 'add',
                amount: value,
                category: category,
                description: description,
                timestamp: new Date().toLocaleString()
            });
            updateDisplay();
            updateHistoryList();
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }

        addPopup.style.display = 'none';
        document.getElementById('amountInputAdd').value = '';
        document.getElementById('categoryAdd').value = 'other';
        document.getElementById('descriptionAdd').value = '';
    });

    // Event listener for subtract button
    document.getElementById('subtract').addEventListener('click', () => {
        subtractPopup.style.display = 'flex';
    });

    // Event listener for submit subtract transaction
    document.getElementById('submitAmountSubtract').addEventListener('click', () => {
        const value = parseFloat(document.getElementById('amountInputSubtract').value);
        const category = document.getElementById('categorySubtract').value;
        const description = document.getElementById('descriptionSubtract').value || 'No description';

        if (!isNaN(value)) {
            amount -= value;
            transactions.push({
                type: 'subtract',
                amount: value,
                category: category,
                description: description,
                timestamp: new Date().toLocaleString()
            });
            updateDisplay();
            updateHistoryList();
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }

        subtractPopup.style.display = 'none';
        document.getElementById('amountInputSubtract').value = '';
        document.getElementById('categorySubtract').value = 'other';
        document.getElementById('descriptionSubtract').value = '';
    });

    // Event listener for history button
    document.getElementById('history').addEventListener('click', () => {
        toggleHistorySection(true);
        updateHistoryList();
    });

    // Event listener for home button
    document.getElementById('home').addEventListener('click', () => {
        toggleHistorySection(false);
    });

    // Initial display update
    updateDisplay();
});
