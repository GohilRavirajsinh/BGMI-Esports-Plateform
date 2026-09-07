const express = require('express');
const router = express.Router();
const { createTournament, getTournaments } = require('../controllers/tournamentController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', getTournaments);
router.post('/', protect, adminOnly, upload.single('bannerImage'), createTournament);

module.exports = router;