const { writeLog } = require('./../log/logger');

function getMatchByMatchId(SchemaName, req, res) {
    const matchId = req.params.matchId;

    SchemaName.findOne({ 'gameId': matchId }, (err, match) => {
        if (err || !match) {
            const message = `404 - getMatchByMatchId failed with id: ${matchId}`
            res.status(404).send(message);
            writeLog('error', message);
        } else {
            res.status(200).send(match);
            writeLog('info', `getMatchByMatchId succeeded with id: ${matchId}`);
        }
    });
}

function saveMatchWithMongoose(SchemaName, req, res) {
    const matchId = req.body.gameId;
    const newMatch = new SchemaName(req.body);

    newMatch.save((err, newMatch) => {
        if (err) {
            res.status(500).send({ error: err.errmsg});
            writeLog('error', `saveMatch failed with id: ${matchId} and message: ${err.errmsg}`);
        } else {
            res.status(201).send({});
            writeLog('info', `saveMatch succeeded with id: ${matchId}`);
        }
    });
}

function saveSummoner(SchemaName, req, res) {
    const summonerId = req.body.accountId;
    const newSummoner = new SchemaName(req.body);
    newSummoner.save((err, newSummoner) => {
        if (err) {
            res.status(500).send({ error: err.errmsg});
            writeLog('error', `saveSummoner failed with id: ${summonerId} and message: ${err.errmsg}`);
        } else {
            res.status(201).send({});
            writeLog('info', `saveSummoner succeeded with id: ${summonerId}`);
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

module.exports.retrieveIndexes = retrieveIndexes;
module.exports.asyncDropAndRetrieveIndexes = asyncDropAndRetrieveIndexes;
module.exports.dropAndRetrieveIndexes = dropAndRetrieveIndexes;
module.exports.createIndex = createIndex;
module.exports.saveMatchWithMongoose = saveMatchWithMongoose;
module.exports.saveSummoner = saveSummoner;
module.exports.saveMatchToMongo = saveMatchToMongo;
module.exports.getMatchByMatchId = getMatchByMatchId;
