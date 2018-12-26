const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const MatchSchema = require('./schemas/MatchSchema').MatchSchema;

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'leageustats';

mongoose.connect('mongodb://localhost:27017/mongooseleaguestats');
const mongooseDb = mongoose.connection;

mongooseDb.once('open', () => {
    console.log('Successfully connected to server!');

    const Match = mongoose.model('match', new mongoose.Schema(MatchSchema));

    app.post('/match', (req, res) => {
        saveMatchWithMongoose(Match, req, res);
    });
});

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function saveMatchWithMongoose(SchemaName, req, res) {
    const newMatch = new SchemaName(req.body);
        newMatch.save((err, newMatch) => {
            if (err) {
                res.status(500).send({ error: err.errmsg});
                return console.log(`Issue saving match: ${err.errmsg}`);
            } else {
                res.status(201).send({});
                return console.log();
            }
        });
}

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

