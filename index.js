const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const env = require('dotenv');

const customer = require('./routes/customer');
const transaction = require('./routes/transaction');

env.config();
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.mongoose_connection, { useNewUrlParser: true, useUnifiedTopology: true },
    success => {
        console.log('Database connection successful');
    },
    err => {
        console.log(err);
    });

const port = process.env.PORT;
app.listen(port, () => {
    console.log('application started in port ', port)
});
app.use('/customer', customer);
app.use('/transaction', transaction);

app.get('/', (req, res) => {
    return res.send('its working');
});

module.exports = app;