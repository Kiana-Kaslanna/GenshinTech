const express = require('express');
const path = require('path');
const { handleMongoResult } = require('../helper/helper');
const { MongoClient } = require('mongodb');
const config = require('../config/config.json');
const MongoURI = config.connection;

var app = module.exports = express();

// general config
app.get('/config/:name', function (req, res) {
    try {
        res.send(require(`../config/${req.params.name}`));
        console.log(`[Get Config] ${req.params.name}`)
    } catch (error) {
        res.status(404).end()
        console.log(`[Not Found] ${req.params.name}`)
    }
})

// get img
app.get('/data/:superType/:childType/:id', function (req, res) {
    try {
        var filePath = path.resolve() + req.url;
        res.sendFile(filePath)
        console.log(`[Get Img] ${req.url}`)
    } catch (error) {
        res.status(404).end()
        console.log(`[Not Found] ${req.url}`)
    }
})

// get data from Mongodb
app.get('/db', function (req, res) {
    MongoClient.connect(MongoURI, function (err, client) {
        const db = client.db(config.db_name)
        db.collection(config.db_collection)
            .find(req.query)
            .toArray((err, result) =>
                handleMongoResult(res, err, result, req.url))
    });
})

// something random from Mongodb
app.get('/random/:num', function (req, res) {
    try {
        MongoClient.connect(MongoURI, function (err, client) {
            const db = client.db(config.db_name)
            db.collection(config.db_collection)
                .aggregate([{ $match: req.query }, { $sample: { size: parseInt(req.params.num) } }])
                .toArray((err, result) =>
                    handleMongoResult(res, err, result, req.url))
        });
    } catch (error) {
        res.status(500).end()
        console.log(`[Mongo Error]`)
    }
})

// search in Mongodb
app.get('/search/:keyword', function (req, res) {
    try {
        MongoClient.connect(MongoURI, function (err, client) {
            const db = client.db(config.db_name)
            db.collection(config.db_collection)
                .aggregate([{ $match: { ...req.query, "name": { $regex: req.params.keyword, $options: 'i' } } }])
                .toArray((err, result) =>
                    handleMongoResult(res, err, result, req.url))
        });
    } catch (error) {
        res.status(500).end()
        console.log(`[Mongo Error]`)
    }
})

// get item by id
app.get('/id/:_id', function (req, res) {
    try {
        if (req.params) {
            MongoClient.connect(MongoURI, function (err, client) {
                const db = client.db(config.db_name)
                db.collection(config.db_collection)
                    .findOne({ '_id': req.params._id },
                        (err, result) => handleMongoResult(res, err, result, req.url))
            });
        } else {
            res.status(404).end("")
        }
    } catch (error) {
        res.status(500).end()
        console.log(`[Mongo Error]`)
    }

})

// get a list of items by a list of ids
app.post('/byids', function (req, res) {
    try {
        if (req.body) {
            MongoClient.connect(MongoURI, function (err, client) {
                const db = client.db(config.db_name)
                db.collection(config.db_collection)
                    .find({ '_id': { '$in': req.body } })
                    .toArray((err, result) =>
                        handleMongoResult(res, err, result, req.url))
            });
        } else {
            res.status(404).end("")
        }
    } catch (error) {
        res.status(500).end()
        console.log(`[Mongo Error]`)
    }
})

// get a list of items' price by a list of ids
app.post('/price', function (req, res) {
    try {
        if (req.body) {
            console.log(req.body)
            MongoClient.connect(MongoURI, function (err, client) {
                const db = client.db(config.db_name)
                db.collection(config.db_collection).aggregate([
                    { '$match': { '_id': { '$in': req.body } } }, { '$project': { 'price': 1 } }
                ]).toArray((err, result) =>
                    handleMongoResult(res, err, result, req.url))
            });
        } else {
            res.status(404).end("")
        }
    } catch (error) {
        res.status(500).end()
        console.log(`[Mongo Error]`)
    }
})
