// CORE MODULES
const fs = require('fs');

//CUSTOM MODULES
const routes = require('./routes.js');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
    }
    
    if(url ==='/message' && method === 'POST') {
        const body = [];
    
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                //res.setHeader('Location', '/');
                return res.end()  
            })
        })
    }
    // process.exit(); // exit the event loop --> shut down program
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end();
}



// EXPORT METHODS

/* module.exports = requestHandler; */

/* module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
} */

/*
moduleexports.handler = requestHandler;
module.exports.someText = "Some text" 
*/

module.exports.handler = requestHandler;
module.exports.someText = "Some hard coded text";