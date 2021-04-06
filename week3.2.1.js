let startAmount = 1000;
let transactions = [
	{ currency: 'USD', amount: 12, type: 'withdrawal' },
	{ currency: 'USD', amount: 104, type: 'withdrawal' },
	{ currency: 'USD', amount: 150, type: 'deposit' },
	{ currency: 'USD', amount: 150, type: 'deposit' },
	{ currency: 'USD', amount: 250, type: 'withdrawal' },
	{ currency: 'USD', amount: 500, type: 'deposit' },
	{ currency: 'USD', amount: 447, type: 'withdrawal' },
	{ currency: 'USD', amount: 120, type: 'deposit' },
	{ currency: 'USD', amount: 58, type: 'withdrawal' },
	{ currency: 'USD', amount: 90, type: 'withdrawal' },
];
const usdToVND = 23000;

function transactionHistory() {
	console.log(`Balance: ${startAmount}`);
	console.log('Transaction History:');
	transactions.forEach((transaction) => {
		if (transaction.type === 'withdrawal') {
			startAmount -= transaction.amount;
			console.log(`- You withdrew $${transaction.amount}. The new balance is $${startAmount}`);
		} else {
			startAmount += transaction.amount;
			console.log(`- You deposited $${transaction.amount}. The new balance is $${startAmount}`);
		}
	});
	console.log(`End Balance: ${startAmount}`);
}
transactionHistory();　

function getBalance(startAmount, transactions) {
	return transactions.reduce((accumulator, transaction) => {
		if (transaction.type === 'withdrawal') {
			accumulator -= transaction.amount;
		} else {
			accumulator += transaction.amount;
		}
		return accumulator;
	}, startAmount);
}
console.log(getBalance(startAmount, transactions));
function filterType(transactions, type) {
	return transactions.filter((transaction) => transaction.type === type).reduce((acc, transaction) => acc + transaction.amount, 0);
	
}

 console.log("Expense: ", filterType(transactions, "withdrawal"));
console.log("Income: ", filterType(transactions, "deposit"));
function changeCurrency(transactions, toCurrency, exchangeRate) {
	return transactions.map((transaction) => ({
		...transaction,
		currency: toCurrency,
		amount: transaction.amount * exchangeRate,
	}));
}

console.log(changeCurrency(transactions, "VND", usdToVND));
function sortTransaction(transactions, sortBy) {
	return transactions.sort((transA, transB) => {
		if (transA[sortBy] > transB[sortBy]) return 1;
		if (transA[sortBy] === transB[sortBy]) return 0;
		if (transA[sortBy] < transB[sortBy]) return -1;
	});
}

 console.log(sortTransaction(transactions, "type"));
 console.log(sortTransaction(transactions, "amount"));

 console.log(
   sortTransaction(
    transactions.filter((transaction) => transaction.type === "deposit"),
     "amount"
   )
 );