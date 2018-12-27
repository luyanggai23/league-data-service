module.exports.SummonerSchema = {
    profileIconId: Number,
    name: String,
    summonerLevel: Number,
    accountId: { type: String, unique: true },
    id: String,
    revisionData: String
}