const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    title: {},
    prizePool: {},
    entryFee: {},
    maxTeams: {},
    bannerImage: {}
}, { timestamps: true });

module.exports = mongoose.model('Tournament', tournamentSchema);