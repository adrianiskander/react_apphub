'use strict';
const fs = require('fs');

const cors = require('cors');
const express = require('express');
const {v4: uuid4} = require('uuid');
const config = require('./config');

const app = express();


app.use(cors({
  'origin': config.clientUrl
}));
app.use(express.json());


app.get('/api/shoutbox/messages', (req, res) => {
  fs.readFile(config.dataPath + '/shoutbox.json', 'utf-8', (err, data) => {
    if( ! data) {
      fs.writeFile(config.dataPath + '/shoutbox.json', JSON.stringify({'messages': []}), 'utf-8', () => {
        res.status(200).json({'messages': []});
      });
    } else {
      res.status(200).send(data);
    }
  });
});


app.post('/api/shoutbox/messages/', (req, res) => {
  // Create new message.
  let message = req.body;
  message.date = new Date();
  message.uid = uuid4();

  fs.readFile(config.dataPath + '/shoutbox.json', 'utf-8', (err, data) => {
    data = JSON.parse(data);
    data.messages.push(message);
    data.messages = data.messages.slice(-100); // limit to last 100 entries
    fs.writeFile(config.dataPath + '/shoutbox.json', JSON.stringify(data), 'utf-8', () => {
      res.status(201).json(message);
    });
  });
});


app.get('/*', (req, res) => {
  // Redirect 404 routes to client.
  res.redirect(302, config.clientUrl);
});


app.listen(config.port, () => {
  console.log(`Express is listening on: ${config.host}:${config.port}`);
});


module.exports = {
  app
};
