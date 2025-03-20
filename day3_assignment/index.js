import express from "express"
import http from "http"
import config from "./config/index.js"; 
import api from './api/index.js';
import passport from "passport";
import session from "express-session";
import path from "path";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "your_secret_key", 
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, 
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("views", "./views");
app.set("view engine", "ejs"); 


app.use('/api',api);

const server =  http.createServer(app)

server.listen(config.serverPort,()=>{
    console.log('server listening on',config.serverPort);
})
