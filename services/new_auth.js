const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname + '/../data/users_info.json');

async function hashPass(data) {
    const readData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    console.log( readData);

    const password = data.password
    const userName = data.username
    const email = data.email

    const hashed = await bcrypt.hash(password, 10);

    const usr = {"userName": userName, "email": email, "password": hashed};

    readData.push(usr)
    console.log(readData);

    fs.writeFileSync(dataPath, JSON.stringify(readData));
}

module.exports = {hashPass};
