import * as express from 'express';
import * as path from 'path';

import { router as authenticateRouter } from './api/authenticate';
import { router as contactsRouter } from './api/contacts';
import { router as seedRouter } from './api/seed';
import { countries } from './countries';

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(require('body-parser').json());

app.get('/api/config', (req, res) => {
  const environment = app.get('env');
  res.json({ environment, countries });
});

if (app.get('env') !== 'production') {
  app.use('/api/seed', seedRouter);
}

app.use('/api/authenticate', authenticateRouter);

app.use('/api/contacts', contactsRouter);

if (app.get('env') === 'production') {
  app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
  });
}

export { app };
