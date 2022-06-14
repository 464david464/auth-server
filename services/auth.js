const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');

const dataPath = path.join(__dirname + "/../data/users_info.json");

function readUsers() {
    const usr = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return usr;
}




function storDataUser(userName, pass) { 
    const usr = readUsers()
    for(let i = 0; i < usr.length; i++){
        let user = usr[i]
        if(user.userName === userName) {
            return {status: false, msg: `user name ${userName} already in use`}
        }
    }
    usr.push({userName, pass});

    fs.writeFileSync(dataPath, JSON.stringify(usr))
    return {msg: 'singin in acsess'}
}



async function hashPassowrd(password) {

    const passHashed = await bcrypt.hash(password, 10);

    return passHashed;
}

async function compareHash(userName, pass) {
    const usres = readUsers()
   for(let i = 0; i < usres.length; i++) {
    const usr = usres[i];
    if(usr.userName === userName){
        const passCompar = await bcrypt.compare(pass, usr.pass);
        console.log(passCompar);
        return passCompar;
    }
       
   }
    return false;
}


function checkToken(token, secret) {
    try{
        const res = jwt.verify(token, secret)
        return true
    } catch(error) {
        console.log(error);
        return false;
    }
}

module.exports = {readUsers, storDataUser, hashPassowrd, compareHash, checkToken};