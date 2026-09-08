const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/tournaments', require('./routes/tournamentRoutes'));

app.get('/', (req, res) => {
    res.send('BGMI Esports API is Live! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));