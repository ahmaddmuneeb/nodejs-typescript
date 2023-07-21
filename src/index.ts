import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
require('dotenv').config();
import './config/db';
import router from './routes';

const port = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// routes
app.use('/api/v1', router());
// server config
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
