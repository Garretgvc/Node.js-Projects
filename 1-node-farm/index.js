
const { log } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
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
const templOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map(element => slugify(element.productName, {lower: true}));

const server = http.createServer((request, response) => {
    const { query, pathname } = url.parse(request.url, true);


    //Overview page
    if (pathname === '/' || pathname === '/overview') {
        response.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObject.map(element => replaceTemplate(templCard, element)).join('');
        const output = templOverview.replace('{%PRODUCT_CARD%}', cardsHtml)
        response.end(output);

        //Product page
    } else if (pathname === '/product') {
        response.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObject[query.id];
        const output = replaceTemplate(templProduct, product);
        response.end(output);


        //API
    } else if (pathname === '/api') {
        // Read the data from the top level code
        response.writeHead(200, { 'Content-type': 'application/json' });
        // console.log(productData);
        response.end(data)

        //Not Found
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