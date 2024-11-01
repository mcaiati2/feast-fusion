import express from 'express';
import {client} from './models/index.js';

import cookieParser from 'cookie-parser';

import routes from './routes/api/index.js';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());


app.use(cookieParser());


app.use('/', routes);


await client.sync({ force: false });

app.listen(PORT, () => console.log('Express server started'));