// import bcryptjs from "bcryptjs";
const bcryptjs = require('bcryptjs');

// export function hashPassword(psw) {
//     return bcryptjs.hashSync(psw, bcryptjs.genSaltSync())
// };

exports.checkPassword = function (psw, hsh) {
    return bcryptjs.compareSync(psw, hsh);
}

// Mongodb result handler

exports.handleMongoResult = function (res, err, result, id) {
    if (err) {
        res.status(404).end()
        console.log(`[Mongo Error]\n` + JSON.stringify(err))
    } else {
        res.send(result)
        console.log(`[Mongo Fetch] ${id}`)
    }
}

exports.handleMongoInsert = function (res, err, result, id) {
    if (err) {
        res.status(404).end()
        console.log(`[Mongo Error]\n` + JSON.stringify(err))
    } else {
        res.status(201).end()
        console.log(`[Mongo Insert] ${id}`)
    }
}