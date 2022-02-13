const { MongoClient } = require('mongodb');
const MongoConfig = require('../../config/Mongo.json');
const char = require('../config/character.json')
const arti = require('../config/artifact.json')
// console.log(MongoConfig[1])

const uri = `mongodb+srv://${MongoConfig[0].Username}:${MongoConfig[0].Password}@kiana.xsdk6.mongodb.net/KIANA?retryWrites=true&w=majority`;

MongoClient.connect(uri, function (err, client) {
    const db = client.db("GenshinTech")
    db.dropCollection("character", () => db.collection("character").insertMany(Object.values(char), () => console.log('character done')))
    db.dropCollection("artifact", () => db.collection("artifact").insertMany(Object.values(arti), () => console.log('artifact done')))
});