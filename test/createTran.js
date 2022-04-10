const transactions = require('../model/transaction')

const newUser = new transactions({
    phone: "+23409036071895",
    amount: 100,
    type:'debit',
});

    newUser.save()