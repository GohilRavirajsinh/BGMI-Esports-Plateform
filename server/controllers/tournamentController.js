const Tournament = require('../models/Tournament');

exports.createTournament = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({
            message: "Banner required"
        });

        const tournament = await Tournament.create({
            ...req.body,
            bannerImage: req.file.path
        });
        res.status(201).json({ tournament });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.json(tournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};