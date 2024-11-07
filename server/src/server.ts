import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import routes from './routes/api/index.js'
import { client } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use(cookieParser());

app.use('/', routes);

if (process.env.PORT) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  })
}

await client.sync({ force: false });

app.listen(PORT, () => console.log('Express server started'));