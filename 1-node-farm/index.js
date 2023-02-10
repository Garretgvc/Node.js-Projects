
const fs = require('fs');
const http = require('http');
const url = require('url');

//---------------FILES---------------------//

//Blcoking, Syncronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');


//non-blocking asyncronous way
// fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
// if (error) return console.log("ERROR!")

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written!')
//             })
//         });
//     });
// });
// console.log('will read file!');  //this will print first

//---------------SERVER---------------------//

// Syncronous, create the object at the beginning and create it only once.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((request, response) => {
    const pathName = request.url;

    if (pathName === '/' || pathName === '/overview') {
        response.end('This is the overview');

    } else if (pathName === '/product') {
        response.end('This is the product');

    } else if (pathName === '/api') {
        // Read the data from the top level code
        response.writeHead(200, { 'Content-type': 'application/json' })
        response.end(data);

    } else {
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello-world'
        });
        response.end('<h1>Page not found!</h1>');
    }
    // response.end('Hello from the sever!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000.');
});