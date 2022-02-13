import bcryptjs from "bcryptjs";
import { callPopUp } from "./ui_modifier";

function toLowerNoSpace(org) {
    return org.replace(" ", "").toLowerCase();
}

function hashPassword(psw) {
    return bcryptjs.hashSync(psw, bcryptjs.genSaltSync())
};

function checkPassword(psw, hsh) {
    return bcryptjs.compareSync(psw, hsh);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export {
    toLowerNoSpace,
    hashPassword,
    checkPassword
};