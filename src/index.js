import fs from 'fs';
import express from 'express';
import puppeteer from 'puppeteer';
import ini from 'ini';

import genPDF from './genPDF';

const service = async () => {
    // init
    try{
        global.config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
        global.browser = await puppeteer.launch()
        browser.on('disconnected', service)
    }
    catch(err) {
        console.log(err)
    }

    const server = express();

    server.get(config.service.baseRoute + '/', (req, res) => {
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
                            <h3>${config.service.baseRoute}/v1/</h3>
                            <p>Generate a pdf based on request html body</p>
                        </li>
                    </ul>

                    <h2>DELETE</h2>
                    <ul>
                        <li>
                            <h3>${config.service.baseRoute}/v1/:id</h3>
                            <p>Delete the pdf with given id</p>
                        </li>
                    </ul>
                </body>
            </html>
        `)
    })

    server.post(config.service.baseRoute + '/v1/', genPDF)
    
    // run
    server.listen(config.service.port)
}

service()