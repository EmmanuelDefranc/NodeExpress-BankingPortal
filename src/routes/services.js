const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data');

router
    .get('/transfer', (req, res) => {
        res.render('transfer');
    })
    .post('/transfer', (req, res) => {
        accounts[req.body.from].balance -= parseInt(req.body.amount);
        accounts[req.body.to].balance += parseInt(req.body.amount);
        //let accountsJSON = JSON.stringify(accounts);
        //fs.writeFileSync(path.join(__dirname,'/json/accounts.json'), accountsJSON, 'UTF-8');
        writeJSON();
        res.render('transfer', {message: 'Transfer Completed'});
    });

router
    .get('/payment', (req, res) => {
        res.render('payment', {account: accounts.credit});
    })
    .post('/payment', (req, res) => {
        accounts['credit'].balance -= parseInt(req.body.amount);
        accounts['credit'].available += parseInt(req.body.amount);
        //let accountsJSON = JSON.stringify(accounts);
        //fs.writeFileSync(path.join(__dirname,'/json/accounts.json'), accountsJSON, 'UTF-8');
        writeJSON();
        res.render('payment', {message: "Payment Successful", account: accounts.credit});
    });

module.exports = router;