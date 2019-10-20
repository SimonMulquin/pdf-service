import fs from 'fs';
import express from 'express';
import ini from 'ini';

global.config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

const server = express();

server.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>pdf-service v1.0.0</title>
            </head>
            <body>
                <h1>pdf-service v1.0.0</h1>
            
                <h2>GET</h2>
                <ul>
                    <li>
                        <h3>${config.service.baseRoute}/v1/:id</h3>
                        <p>Get the pdf with given id</p>
                    </li>
                </ul>

                <h2>POST</h2>
                <ul>
                    <li>
                        <h3>${config.service.baseRoute}/v1/*templatePath</h3>
                        <p>Fullfill an handlebars template with the body(json) of the request, generate a pdf based on the html result and return it's id</p>
                    </li>
                </ul>
            </body>
        </html>
    `)
})

server.listen(config.service.port)