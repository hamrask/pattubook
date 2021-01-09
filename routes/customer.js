const router = require('express').Router();
const customer = require('../models/customer');

// save customer
router.post('/', async(req, res) => {
    try {
        const mobileExists = await customer.find({ mobile: req.body.mobile });
        if (mobileExists && mobileExists.length > 0) {
            return res.status(400)
                .send({ message: 'Mobile Number already exists' });
        }
        const data = new customer(req.body);
        const response = await data.save();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});
// get all customers
router.get('/', async(req, res) => {
    try {
        customer.find()
            .exec()
            .then(x => {
                return res.status(200).json(x);
            })
    } catch (error) {
        return res.status(500).json(error);
    }
});
module.exports = router;