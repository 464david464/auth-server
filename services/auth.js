const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const dataPath = path.join(__dirname + "/../data/users_info.json");

function storDataUser(userName, pass) {
    const usr = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    usr.push({userName, pass});

    fs.writeFileSync(dataPath, JSON.stringify(usr))
}

async function hashPassowrd(password) {

    const passHashed = await bcrypt.hash(password, 10);

    return passHashed;
}

module.exports = {storDataUser, hashPassowrd};