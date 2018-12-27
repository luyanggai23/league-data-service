const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const MatchSchema = require('./schemas/MatchSchema').MatchSchema;
const SummonerSchema = require('./schemas/SummonerSchema').SummonerSchema;

const mongoUtils = require('./utils/mongo-utils');

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
    const Summoner = mongoose.model('summoner', new mongoose.Schema(SummonerSchema));

    app.post('/match', (req, res) => {
        mongoUtils.saveMatchWithMongoose(Match, req, res);
    });

    app.post('/summoner', (req, res) => {
        mongoUtils.saveSummoner(Summoner, req, res);
    });
});

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


