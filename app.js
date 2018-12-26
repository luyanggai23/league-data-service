const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'leageustats';

mongoose.connect('mongodb://localhost:27017/mongooseleaguestats');
const mongooseDb = mongoose.connection;

mongooseDb.once('open', () => {
    console.log('Successfully connected to server!');

    const matchSchema = new mongoose.Schema({
        gameId: Number,
        gameCreation: Number
    });
    const Match = mongoose.model('match', matchSchema);
    // const db = client.db(dbName);

    app.post('/match', (req, res) => {
        // db.collection('match').insertOne(req.body, (err, result) => {
        //     if (err) {
        //         res.status(500).send({ error: err.errmsg});
        //         return console.log(err);
        //     } else {
        //         res.status(201).send({});
        //         return console.log();
        //     }

        //     console.log('saved to database');
        // });


        const newMatch = new Match(req.body);
        newMatch.save((err, newMatch) => {
            if (err) {
                res.status(500).send({ error: err.errmsg});
                return console.log('is this the error');
            } else {
                res.status(201).send({});
                return console.log();
            }
        });
    });
});

app.use(bodyParser.json());


client.connect(function(err) {
    console.log('Successfully connected to server!');

    const db = client.db(dbName);

    app.post('/match', (req, res) => {
        saveMatchToMongo(db, req, res);
    });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function saveMatchToMongo(db, req, res) {
    db.collection('match').insertOne(req.body, (err, result) => {
        if (err) {
            res.status(500).send({ error: err.errmsg});
            return console.log(err);
        } else {
            res.status(201).send({});
            return console.log();
        }

        console.log('saved to database');
    });
}

async function createIndex(db) {
    db.collection('match').createIndex("gameId", { unique: true }, (err) => {
        if (err) console.log(err);
    });
}

function dropAndRetrieveIndexes(db) {
    db.collection('match').dropIndexes({}).then(results => {
        console.log(`results: ${results}`);
        db.collection('match').indexes({}).then(indicies => {
            console.log(indicies);
        }).catch(err => {
            console.log(`error getting indicies: ${err}`);
        });
    }).catch(err => {
        console.log(`error dropping indexes: ${err}`);
    });
}

async function asyncDropAndRetrieveIndexes(db) {
    try {
        let dropIndexesResults = await db.collection('match').dropIndexes();
        let getIndexesResults = await db.collection('match').indexes({});
        console.log(`getIndex results: ${JSON.stringify(getIndexesResults)}`);
    } catch(err) {
        console.log(`error: ${err}`);
    }
}

async function retrieveIndexes(db) {
    let getIndexesResults = await db.collection('match').indexes({});
    console.log(`getIndex results: ${JSON.stringify(getIndexesResults)}`);
}

