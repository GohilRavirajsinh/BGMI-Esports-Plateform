const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/tournaments', require('./routes/tournamentRoutes'));

app.get('/', (req, res) => {
    res.send('BGMI Esports API is Live! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));