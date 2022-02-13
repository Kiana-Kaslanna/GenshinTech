const express = require('express')
const session = require('express-session')
const cors = require('cors');
const body_parser = require('body-parser');

var app = express()

// settings
app.use(cors({
    origin: require('./config/config.json').client_host,
    credentials: true
}))
app.use(session({
    secret: 'kianakaslanna',
    resave: false,
    saveUninitialized: true
}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

// routes
app.use(require('./controllers/dataControllers'))
app.use(require('./controllers/userControllers'))

// error
app.use((err, req, res, next) => {
    if (!err) return next();
    res.status(500).send('Internal Server Error');
})

// ports
app.listen(31244)