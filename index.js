const express = require('express');
const connectDB = require('./dbconnection');
const app = express();

require('dotenv').config();
connectDB();

app.set('view engine', 'pug');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/createuser', (req, res) => {
    res.render('create_user');
});

app.post('/createuser', (req, res) => {

})

app.get('/viewuser', (req, res) => {
    res.render('view_user')
})

app.post('/viewuser', (req, res) => {

})