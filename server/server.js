import http     from 'http';
import path     from 'path';
import express  from 'express';

const app     = express();
const server  = http.Server(app);
const ONEYEAR = 31557600000;

app.use(express.static(path.join(__dirname, '../static'), { maxAge : ONEYEAR }));

export default server;
