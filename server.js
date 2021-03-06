const http = require("http");
const fs = require("fs");
const author = require("./services/autorization");
var jwt = require("jsonwebtoken");
const secret = "secret";
const usrLIst = author.readUsers()
let userNAmeForLOgin;

const server = http.createServer(async (req, res) => {
  const { url, method, headers } = req;

  const cookie = headers.cookie;
  const decoded = jwt.decode(cookie, {complete: true});
  switch (url) {
    //loading pages
    case "/":
      if(!cookie) {
        fs.createReadStream("./pages/login/login.html").pipe(res);
      }else {
        fs.createReadStream("./pages/home/index.html").pipe(res);
       
        console.log(decoded)

      }
      
      break;
    case "/index.js":
      fs.createReadStream("./pages/home/index.js").pipe(res);
      break;
    case "/index.css":
      fs.createReadStream("./pages/home/index.css").pipe(res);
      break;

    case "/login":
      fs.createReadStream("./pages/login/login.html").pipe(res);
      break;
    case "/login.js":
      fs.createReadStream("./pages/login/login.js").pipe(res);
      break;
    case "/login.css":
      fs.createReadStream("./pages/login/login.css").pipe(res);
      break;

    case "/singin":
      fs.createReadStream("./pages/singin/singin.html").pipe(res);
      break;
    case "/singin.js":
      fs.createReadStream("./pages/singin/singin.js").pipe(res);
      break;
      case "/singin.css":
        fs.createReadStream("./pages/singin/singin.css").pipe(res);
        break;


    case "/privet":
      if(!cookie) {
        res.writeHead(302, {
          location: '/login'
        });
        res.end()
      } else{
        const token = cookie.replace('token=', '')
        const tokenRes = author.checkToken(token, secret)
        console.log(tokenRes);
        if(tokenRes.ststus) {
          userNAmeForLOgin = tokenRes.info
          fs.createReadStream("./pages/private/privet.html").pipe(res);
        } else{
          res.writeHead(302, {
            location: '/login'
          });
          res.end()
        }
      }

      break;
    case "/privet.js":
      fs.createReadStream("./pages/private/privet.js").pipe(res);
      break;
    case "/privet.css":
      fs.createReadStream("./pages/private/privet.css").pipe(res);
      break;
    case "/fonts/Metavers.ttf":
      fs.createReadStream("./fonts/Metavers.ttf").pipe(res);
      break;

    //api/operations
    case "/api/log":
      if (method === "POST") {
        const buffer = [];
        for await (const chunk of req) {
          buffer.push(chunk);
        }

        const data = Buffer.concat(buffer).toString();
        const details = JSON.parse(data);

        const userName = details.username;
        const pass = details.password;

        const hash = await author.hashPassowrd(pass);

        const registerUser = author.storDataUser(userName, hash);
        res.end(JSON.stringify(registerUser));
      } else if 
      (method === "PUT") {
        const buffer = [];
        for await (const chunk of req) {
          buffer.push(chunk);
        }

        const data = Buffer.concat(buffer).toString();
        const details = JSON.parse(data);

        const userName = details.username;
        const pass = details.password;

        const result = await author.compareHash(userName, pass);
        let isToken = false;
        if (result) {
          const token = jwt.sign(
            { name: userName, isAuthentication: true },
            secret,
            { expiresIn: "1H" }
          );
          isToken = true;
          res.writeHead(302, {
            "Set-Cookie": `token= ${token};path=/`,
          });
        }
        if(!result) {
           res.end(JSON.stringify({ msg: `the name: ${userName} is not registered`, isToken }));
        } else {
          res.end(JSON.stringify({ msg: `login secses`, isToken }));
        }
       
      } else if (method === 'GET') {
        res.end(JSON.stringify({useNAme: userNAmeForLOgin}))
      }
      break;
      case '/sendUserName':
        const buffer = [];
        for await (const chunk of req) {
          buffer.push(chunk);
        }
        const data = Buffer.concat(buffer).toString();
        userNAmeForLOgin = data
        break;

    default:
      fs.createReadStream("./pages/404/404.html").pipe(res);
      break;
  }

  res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
});

server.listen(4646);

console.log("server listening to 4646");
