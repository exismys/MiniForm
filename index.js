const { urlencoded } = require('express');
const express = require('express');
const connectDB = require('./dbconnection');
const {check, validationResult} = require('express-validator');
const User = require("./models/user");
const app = express();

// Making database connection
require('dotenv').config();
connectDB();

// Seting up view engine
app.set('view engine', 'pug');

// Specifying port
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))

// Making server listen to request on the given port
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

// Routes

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/createuser', (req, res) => {
    res.render('create_user');
});

app.post('/createuser', [
    check('firstname').isAlpha().isLength({min: 5}).withMessage("First name can not be less than 5 characters"),
    check('lastname').isAlpha().isLength({min: 5}).withMessage("Last name can not be less than 5 characters"),
    check('email').isEmail().withMessage("Email should be valid"),
    check('dob').isDate().withMessage("DOB should be a valid date"),
    check('domain').isAlpha().withMessage("Domain name should be valid"),
], async (req, res) => {

    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        const userInfo = req.body;
        const user = new User();
        user.firstname = userInfo.firstname;
        user.lastname = userInfo.lastname;
        user.email = userInfo.email;
        user.dob = userInfo.dob;
        user.domain = userInfo.domain;
        const skills = [];
        if (typeof(userInfo.skills) == String) {
            skills.push(userInfo.skills);
        }
        user.skills = skills;
        await user.save();
        return res.send('Data Saved!')
    } else {
        return res.status(400).json({errors: errors.array()});
    }
})

app.get('/viewuser', (req, res) => {
    res.render('view_user')
})

app.post('/viewuser', (req, res) => {

})