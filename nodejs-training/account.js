var em = require('events').EventEmitter;

function Account(id, name, balance) {
    this.AcId = id;
    this.Name = name;
    this.Balance = balance;
    em = new em.EventEmitter();
    this.em = em;

    this.Deposit = (amt) => {
        this.Balance += amt;
        em.emit('Deposit', { balance: this.Balance });
    }

    this.Withdraw = (amt) => {
        this.Balance -= amt;
        em.emit('Withdraw', { balance: this.Balance });
    }
}

module.exports = Account;