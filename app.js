const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'leageustats';

app.use(bodyParser.json());


client.connect(function(err) {
    console.log('Successfully connected to server!');

    const db = client.db(dbName);

    app.post('/match', (req, res) => {
        db.collection('match').insertOne(req.body, (err, result) => {
            if (err) {
                res.status(500).send({ error: 'There was an issue saving your thing.'});
                return console.log(err);
            } else {
                res.status(201).send({});
                return console.log();
            }

            console.log('saved to database');
        });

    });
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))