const express = require('express');
const { checkPassword, handleMongoInsert, handleMongoResult } = require('../helper/helper');
const { MongoClient } = require('mongodb');
const config = require('../config/config.json');
const MongoURI = config.connection;

var app = module.exports = express();

// user sign up
app.post('/reg', function (req, res) {
    try {
        const { firstName, lastName, userName: _id, passWord } = req.body;
        const jsn = {
            firstName: firstName,
            lastName: lastName,
            _id: _id,
            passWord: passWord
        }
        MongoClient.connect(MongoURI, function (err, client) {
            const db = client.db(config.db_name)
            db.collection(config.user_collection).insertOne(jsn, (err, result) => {
                if (err) {
                    res.status(409).send({ main: "", msg: 'Username Exist' })
                    console.log(`[User Fail] Sign up fail`)
                } else {
                    req.session.user = _id;
                    res.status(201).send({ main: _id, msg: 'User Created' })
                    console.log(`[User OK] Sign up`)
                }
            })
        });
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})

// user sign in
app.post('/login', function (req, res) {
    try {
        const { userName, passWord } = req.body;
        MongoClient.connect(MongoURI, function (err, client) {
            const db = client.db(config.db_name)
            db.collection(config.user_collection).findOne({ _id: userName }, (err, result) => {
                if (err) {
                    res.status(404).send({ main: "", msg: 'Internet Error' })
                } else {
                    if (!result) {
                        res.status(401).send({ main: "", msg: 'Username Not Exist' })
                        console.log(`[User Fail] Sign in fail`)
                    } else if (checkPassword(passWord, result.passWord)) {
                        req.session.user = userName;
                        res.status(200).send({ main: userName, msg: 'Login Successful' })
                        console.log(`[User OK] Sign in`)
                    } else {
                        res.status(401).send({ main: "", msg: 'Password Incorrect' })
                        console.log(`[User Fail] Sign in fail`)
                    }
                }
            })
        });
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})

// user log out
app.get('/logout', function (req, res) {
    try {
        req.session.user = undefined
        res.status(200).end()
        console.log(`[User OK] Log out`)
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})

// get current user
app.get('/user', function (req, res) {
    try {
        res.send(req.session.user)
        console.log(`[User OK] Get user`)
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})

// order set
app.post('/order/set', function (req, res) {
    try {
        if (req.session.user) {
            var jsn = {
                _id: `${req.session.user}${Date.now()}`,
                user: req.session.user,
                order: JSON.stringify(req.body)
            }
            console.log(jsn)
            MongoClient.connect(MongoURI, function (err, client) {
                const db = client.db(config.db_name)
                db.collection(config.order_collection)
                    .insertOne(jsn, (err, result) =>
                        handleMongoInsert(res, err, result, 'order'))
            });
        } else {
            res.status(404).send("")
        }
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})

// order get (by id or by current user)
app.get('/order/get', function (req, res) {
    try {
        if (req.session.user) {
            MongoClient.connect(MongoURI, function (err, client) {
                const db = client.db(config.db_name)
                if (req.query._id) {
                    db.collection(config.order_collection)
                        .findOne({ '_id': req.query._id }, (err, result) =>
                            handleMongoResult(res, err, result, 'order'))
                } else {
                    db.collection(config.order_collection)
                        .find({ 'user': req.session.user })
                        .toArray((err, result) =>
                            handleMongoResult(res, err, result, 'order'))
                }
            });
        }
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})

// table set (wishlist & cart)
app.post('/:table/set', function (req, res) {
    try {
        if (req.session.user &&
            (
                req.params.table === config.wish_collection ||
                req.params.table === config.cart_collection
            )) {
            var jsn = {
                '_id': req.session.user,
                [req.params.table]: JSON.stringify(req.body)
            }
            console.log(jsn)
            MongoClient.connect(MongoURI, function (err, client) {
                const db = client.db(config.db_name)
                db.collection(req.params.table).updateOne(
                    { '_id': req.session.user },
                    { $set: { [req.params.table]: JSON.stringify(req.body) } },
                    { upsert: true },
                    (err, result) => handleMongoInsert(res, err, result, req.params.table))
            });
        } else {
            res.status(404).send("")
        }
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})

// table get (wishlist & cart)
app.get('/:table/get', function (req, res) {
    try {
        if (req.session.user &&
            (
                req.params.table === config.wish_collection ||
                req.params.table === config.cart_collection
            )) {
            MongoClient.connect(MongoURI, function (err, client) {
                const db = client.db(config.db_name)
                db.collection(req.params.table)
                    .findOne({ '_id': req.session.user }, (err, result) =>
                        handleMongoResult(res, err, result, req.params.table))
            });
        }
    } catch (error) {
        res.status(500).end()
        console.log(`[Server Error]`)
    }
})