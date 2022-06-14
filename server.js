const http = require('http');
const fs = require('fs');
const author = require('./services/auth');

const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    switch (url) {
        //loading pages
        case '/':
            fs.createReadStream('./pages/home/index.html').pipe(res)
            break;
            case '/index.js':
            fs.createReadStream('./pages/home/index.js').pipe(res)
            break;
            case '/index.css':
            fs.createReadStream('./pages/home/index.css').pipe(res)
            break;

            case '/login':
            fs.createReadStream('./pages/login/login.html').pipe(res)
            break;
            case '/login.js':
            fs.createReadStream('./pages/login/login.js').pipe(res)
            break;
            case '/login.css':
            fs.createReadStream('./pages/login/login.css').pipe(res)
            break;

            case '/singin':
            fs.createReadStream('./pages/singin/singin.html').pipe(res)
            break;
            case '/singin.js':
            fs.createReadStream('./pages/singin/singin.js').pipe(res)
            break;

            case '/privet':
            fs.createReadStream('./pages/privet/privet.html').pipe(res)
            break;
            case '/privet.js':
            fs.createReadStream('./pages/privet/privet.js').pipe(res)
            break;
            case '/privet.css':
            fs.createReadStream('./pages/privet/privet.css').pipe(res)
            break;
            case '/fonts/Metavers.ttf':
            fs.createReadStream('./fonts/Metavers.ttf').pipe(res)
            break;
            

            //api/operations
            case '/api/log':
                if(method === 'POST') {
                    const buffer = [];
                    for await(const chunk of req) {
                        buffer.push(chunk)
                    }

                    const data = Buffer.concat(buffer).toString();
                    const details = JSON.parse(data);

                    const userName = details.username;
                    const pass = details.password;


                    const hash = await author.hashPassowrd(pass);

                    author.storDataUser(userName, hash);
                    res.end(JSON.stringify({msg: 'sing in secsses'}))
                }
                 else if(method === 'GET') {
                    const buffer = [];
                    for await(const chunk of req) {
                        buffer.push(chunk)
                    }

                    const data = Buffer.concat(buffer).toString();
                    const details = JSON.parse(data);
                    console.log(details);
                }
            break;


        default:
            fs.createReadStream('./pages/404/404.html').pipe(res)
            break;
    }

    res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
})

server.listen(4646);

console.log('server listening to 4646');