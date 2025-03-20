import express from "express"
import http from "http"
import config from "./config/index.js"; 
import api from './api/index.js';

const app = express();
app.use(express.json());
app.use('/api',api);

const server =  http.createServer(app)

server.listen(config.serverPort,()=>{
    console.log('server listening on',config.serverPort);
})
