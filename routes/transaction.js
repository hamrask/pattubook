const router = require('express').Router();
const transaction = require('../models/transaction');
const customer = require('../models/customer');

// add a transaction
router.post('/', async(req, res) => {
    try {
        const data = new transaction(req.body);
        if (!data.debt) {
            data.amount = 0 - data.amount;
        }
        customer.findById(req.body.customerId)
            .exec()
            .then(async x => {
                data.customerName = x.name;
                const response = await data.save();
                return res.status(200).json(response);
            })
    } catch (error) {
        return res.status(500).json(error);
    }
});

// get all transactions
router.get('/', async(req, res) => {
    try {
        transaction.find()
            .exec()
            .then(x => {
                return res.status(200).json(x);
            });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// get transactions by user
router.post('/filter', async(req, res) => {
    try {
        transaction.find(req.body)
            .exec()
            .then(x => {
                const amounts = x.map(x => x.amount);
                const total = amounts.reduce((a, b) => {
                    return a + b;
                });
                const response = {
                    total,
                    list: x
                };
                return res.status(200).json(response);
            });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;