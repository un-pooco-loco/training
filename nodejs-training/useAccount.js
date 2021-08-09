const account = require('./account');

var ac1 = new account(1, 'Maitri', 50000.00);
ac1.Deposit(10000);
console.log(account.Balance);
ac1.Withdraw(2000);
console.log(account.Balance);