const fs = require('fs');
const path = require('path');
const express = require('express');
const { RSA_NO_PADDING } = require('constants');
const {accounts, users, writeJSON} = require('./data');

const app = express();

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

//const accountData = fs.readFileSync(path.join(__dirname,'/json/accounts.json'),'UTF-8');
//const accounts = JSON.parse(accountData);

//const userData = fs.readFileSync(path.join(__dirname,'/json/users.json'),'UTF-8');
//const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index',{
        title:'Account Summary',
        accounts: accounts
    });
});

app.get('/savings', (req, res) => {
    res.render('account', {account: accounts.savings});
})

app.get('/checking', (req, res) => {
    res.render('account', {account: accounts.checking});
});

app.get('/credit', (req, res) => {
    res.render('account', {account: accounts.credit});
});

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]});
});

app
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

app
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

app.listen(3000, () => {
    console.log("PS Project Running on port 3000!");
});