const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(require('body-parser').json());

app.get('/api/config', (req, res) => {
  const environment = app.get('env');
  const countries = require('./countries.json');

  res.json({ environment, countries });
});

if (app.get('env') !== 'production') {
  app.use('/api/seed', require('./api/seed'));
}

app.use('/api/contacts', require('./api/contacts'));

if (app.get('env') === 'production') {
  app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

module.exports = app;
