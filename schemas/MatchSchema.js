module.exports.MatchSchema = {
    seasonId: Number,
    queueId: Number,
    gameId: { type: String, unique: true },
    participantIdentities: Array,
    gameVersion: String,
    platformId: String,
    gameMode: String,
    mapId: Number,
    gameType: String,
    teams: Array,
    participants: Array,
    gameDuration: Number,
    gameCreation: String
}